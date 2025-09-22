import { BadRequestException, Injectable, Logger } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private database: DatabaseService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { amount, currency, description } = createPaymentDto;
    const currencyCode = currency.toUpperCase();

    let amountInPLN: number;
    let exchangeRate: number;

    if (currencyCode === "PLN") {
      amountInPLN = amount;
      exchangeRate = 1;
    } else {
      const currencyData = await this.database.currency.findUnique({
        where: { code: currencyCode },
      });

      if (currencyData === null) {
        throw new BadRequestException(`Currency ${currency} not supported`);
      }

      exchangeRate = Number.parseFloat(currencyData.rate.toString());
      amountInPLN = amount * exchangeRate;
    }

    const payment = await this.database.payment.create({
      data: {
        originalAmount: amount,
        amountInPLN: Number.parseFloat(amountInPLN.toFixed(2)),
        exchangeRate: Number.parseFloat(exchangeRate.toFixed(4)),
        description,
        currencyCode,
      },
      include: {
        currency: true,
      },
    });

    return {
      id: payment.id,
      originalAmount: payment.originalAmount.toString(),
      originalCurrency: payment.currencyCode,
      amountInPLN: payment.amountInPLN.toString(),
      exchangeRate: payment.exchangeRate.toString(),
      createdAt: payment.createdAt,
      description: payment.description,
    };
  }

  async getPayments() {
    return this.database.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: { currency: true },
    });
  }
}
