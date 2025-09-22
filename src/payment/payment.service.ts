/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import { CurrencyService } from "src/currency/currency.service";
import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly CurrencyService: CurrencyService,
  ) {}
  async create(dto: CreatePaymentDto) {
    const rate = await this.CurrencyService.findOne(dto.currency);
    if (rate == null) {
      throw new Error(`No rate found for currency ${dto.currency}`);
    }

    const amountPln = dto.amount * Number(rate.rate);

    return this.prisma.payment.create({
      data: {
        amount: dto.amount,
        currency: dto.currency,
        amountPln,
      },
    });
  }

  async findAll() {
    return this.prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} payment`;
  // }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} payment`;
  // }
}
