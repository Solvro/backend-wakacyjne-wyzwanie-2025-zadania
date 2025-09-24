import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(private readonly database: DatabaseService) {}

  async createPayment(dto: CreatePaymentDto) {
    const currency = await this.database.currency.findUnique({
      where: { code: dto.currencyCode.toUpperCase() },
    });

    if (currency == null) {
      throw new BadRequestException("Unsupported currency");
    }

    const amountPLN = dto.amount * Number(currency.rate);

    return this.database.payment.create({
      data: {
        amount: dto.amount,
        currencyId: currency.id,
        amountPLN,
      },
    });
  }

  async getAll() {
    return this.database.payment.findMany({ include: { currency: true } });
  }

  async getOne(id: number) {
    const payment = await this.database.payment.findUnique({
      where: { id },
      include: { currency: true },
    });

    if (payment == null) {
      throw new NotFoundException("Payment not found");
    }

    return payment;
  }
}
