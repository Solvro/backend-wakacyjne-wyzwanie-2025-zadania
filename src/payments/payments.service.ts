import { Injectable, NotFoundException } from "@nestjs/common";

import { CurrencyService } from "../currency/currency.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentResponseDTO } from "./dto/create-payment-response.dto";
import { CreatePaymentDTO } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private currency: CurrencyService,
  ) {}

  async create(data: CreatePaymentDTO): Promise<CreatePaymentResponseDTO> {
    const latest = await this.currency.findLatestForCurrency({
      currency: data.currency,
    });

    if (latest === null) {
      throw new Error("No exchange was found for that currency");
    }
    const amountPln = Number(latest.rate) * data.amount;

    const payment = await this.prisma.payment.create({
      data: {
        currency: data.currency,
        amount: data.amount,
        amount_pln: amountPln,
        participant_id: data.participant_id,
      },
    });
    return {
      id: payment.id,
      currency: payment.currency,
      created_at: payment.created_at,
      amount: payment.amount.toNumber(),
      amount_pln: payment.amount_pln.toNumber(),
      participant_id: payment.participant_id,
    };
  }
  async findAll() {
    return await this.prisma.payment.findMany();
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (payment === null) {
      throw new NotFoundException("The payment with given id doesn't exist");
    }
    return payment;
  }
}
