import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { ForexService } from "../forex/forex.service";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreatePaymentDto,
  PaymentConversionInfoDto,
  PaymentResponseDto,
  PaymentStatusDto,
  SupportedCurrency,
  UpdatePaymentStatusDto,
} from "./dto/payment.dto";
import { PaymentDatabaseUtils } from "./payment-utils";
import type { CreatePaymentData, PaymentEntity } from "./payment-utils";

@Injectable()
export class PaymentsService {
  private readonly paymentDb: PaymentDatabaseUtils;

  constructor(
    private readonly prisma: PrismaService,
    private readonly forexService: ForexService,
  ) {
    this.paymentDb = new PaymentDatabaseUtils(prisma);
  }

  /**
   * Create a new payment with currency conversion
   */
  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    const {
      originalAmount,
      originalCurrency,
      tripId,
      expenseId,
      ...paymentBaseData
    } = createPaymentDto;

    // Validate that trip and expense exist if provided
    if (tripId !== undefined) {
      const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
      if (trip === null) {
        throw new NotFoundException(
          `Trip with ID ${tripId.toString()} not found`,
        );
      }
    }

    if (expenseId !== undefined) {
      const expense = await this.prisma.expense.findUnique({
        where: { id: expenseId },
      });
      if (expense === null) {
        throw new NotFoundException(
          `Expense with ID ${expenseId.toString()} not found`,
        );
      }
    }

    // Calculate PLN amount and exchange rate
    const conversionResult = await this.convertCurrencyToPLN(
      originalAmount,
      originalCurrency,
    );

    try {
      const paymentCreateData: CreatePaymentData = {
        ...paymentBaseData,
        originalAmount,
        originalCurrency,
        plnAmount: conversionResult.plnAmount,
        exchangeRate: conversionResult.exchangeRate,
        status: "PENDING" as const,
        tripId: tripId ?? null,
        expenseId: expenseId ?? null,
        createdAt: new Date(),
      };

      const payment = await this.paymentDb.safeCreatePayment(paymentCreateData);

      return this.mapToPaymentResponse(payment);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new BadRequestException(
        `Failed to create payment: ${errorMessage}`,
      );
    }
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(id: number): Promise<PaymentResponseDto> {
    const payment = await this.paymentDb.safeFindPayment(id);

    if (payment === null) {
      throw new NotFoundException(`Payment with ID ${id.toString()} not found`);
    }

    return this.mapToPaymentResponse(payment);
  }

  /**
   * Get all payments with optional filtering
   */
  async getPayments(options?: {
    tripId?: number;
    expenseId?: number;
    status?: string;
    currency?: SupportedCurrency;
    limit?: number;
    offset?: number;
  }): Promise<PaymentResponseDto[]> {
    const defaults = { limit: 50, offset: 0 };
    const { tripId, expenseId, status, currency, limit, offset } = {
      ...defaults,
      ...options,
    };

    const where: Record<string, unknown> = {};
    if (tripId !== undefined) {
      where.tripId = tripId;
    }
    if (expenseId !== undefined) {
      where.expenseId = expenseId;
    }
    if (status !== undefined) {
      where.status = status;
    }
    if (currency !== undefined) {
      where.originalCurrency = currency;
    }

    const payments = await this.paymentDb.safeFindManyPayments({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return payments.map((payment) => this.mapToPaymentResponse(payment));
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    id: number,
    updateDto: UpdatePaymentStatusDto,
  ): Promise<PaymentResponseDto> {
    const payment = await this.paymentDb.safeFindPayment(id);

    if (payment === null) {
      throw new NotFoundException(`Payment with ID ${id.toString()} not found`);
    }

    const updatedPayment = await this.paymentDb.safeUpdatePayment(id, {
      status: updateDto.status,

      processedAt:
        updateDto.status === PaymentStatusDto.COMPLETED
          ? new Date()
          : payment.processedAt,
    });

    return this.mapToPaymentResponse(updatedPayment);
  }

  /**
   * Delete payment
   */
  async deletePayment(id: number): Promise<void> {
    const payment = await this.paymentDb.safeFindPayment(id);

    if (payment === null) {
      throw new NotFoundException(`Payment with ID ${id.toString()} not found`);
    }

    await this.paymentDb.safeDeletePayment(id);
  }

  /**
   * Get payment conversion info
   */
  async getPaymentConversionInfo(
    id: number,
  ): Promise<PaymentConversionInfoDto> {
    const payment = await this.paymentDb.safeFindPayment(id);

    if (payment === null) {
      throw new NotFoundException(`Payment with ID ${id.toString()} not found`);
    }

    // Get the forex rate used for this payment

    let rateTimestamp = payment.createdAt;

    if (payment.exchangeRate !== null && payment.originalCurrency !== "PLN") {
      // Try to find the exact rate record used
      const forexRate = await this.prisma.forexRate.findFirst({
        where: {
          currency: payment.originalCurrency,
        },
        orderBy: { fetchedAt: "desc" },
      });

      if (forexRate !== null) {
        rateTimestamp = forexRate.fetchedAt;
      }
    }

    return {
      originalAmount: `${payment.originalAmount.toFixed(2)} ${payment.originalCurrency}`,

      plnAmount: `${payment.plnAmount.toFixed(2)} PLN`,

      exchangeRate: payment.exchangeRate ?? 1,

      rateTimestamp: rateTimestamp.toISOString(),

      convertedAt: payment.createdAt.toISOString(),
    };
  }

  /**
   * Convert currency amount to PLN using latest exchange rates
   */
  private async convertCurrencyToPLN(
    amount: number,
    currency: SupportedCurrency,
  ): Promise<{ plnAmount: number; exchangeRate: number | null }> {
    if (currency === SupportedCurrency.PLN) {
      return {
        plnAmount: amount,
        exchangeRate: null,
      };
    }

    // Get latest exchange rate
    const latestRates = await this.forexService.getLatestRates();
    const rate = latestRates.find(
      (r) => r.currencyName === (currency as string),
    );

    if (rate === undefined) {
      throw new BadRequestException(
        `Exchange rate not available for currency: ${currency}. Please try again later.`,
      );
    }

    const plnAmount = amount * rate.rate;

    return {
      plnAmount: Math.round(plnAmount * 100) / 100, // Round to 2 decimal places
      exchangeRate: rate.rate,
    };
  }

  /**
   * Map Payment entity to PaymentResponseDto
   */
  private mapToPaymentResponse(payment: PaymentEntity): PaymentResponseDto {
    return {
      id: payment.id,
      title: payment.title,
      description: payment.description ?? undefined,
      originalAmount: payment.originalAmount,
      originalCurrency: payment.originalCurrency as SupportedCurrency,
      plnAmount: payment.plnAmount,
      exchangeRate: payment.exchangeRate ?? undefined,
      status: payment.status as PaymentStatusDto,
      processedAt: payment.processedAt?.toISOString(),
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
      tripId: payment.tripId ?? undefined,
      expenseId: payment.expenseId ?? undefined,
    };
  }
}
