import { BadRequestException, Injectable, Logger } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private database: DatabaseService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { amount, currency, description } = createPaymentDto;

    const currencyData = await this.database.currency.findUnique({
      where: { code: currency.toUpperCase() },
    });

    if (currencyData === null) {
      throw new BadRequestException(`Currency ${currency} not supported`);
    }

    let amountInPLN: number;
    let exchangeRate: number;

    if (currency.toUpperCase() === "PLN") {
      amountInPLN = amount;
      exchangeRate = 1;
    } else {
      exchangeRate = Number.parseFloat(currencyData.rate.toString());
      amountInPLN = amount * exchangeRate;
    }

    const payment = await this.database.payment.create({
      data: {
        originalAmount: amount,
        originalCurrency: currency.toUpperCase(),
        amountInPLN: Number.parseFloat(amountInPLN.toFixed(2)),
        exchangeRate: Number.parseFloat(exchangeRate.toFixed(4)),
        description,
      },
    });

    return {
      id: payment.id,
      originalAmount: payment.originalAmount.toString(),
      originalCurrency: payment.originalCurrency,
      amountInPLN: payment.amountInPLN.toString(),
      exchangeRate: payment.exchangeRate.toString(),
      createdAt: payment.createdAt,
      description: payment.description,
    };
  }

  async getPayments() {
    return this.database.payment.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}
