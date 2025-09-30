import { Currency, PrismaClient } from "@prisma/client";

import { Injectable } from "@nestjs/common";

const prisma = new PrismaClient();

@Injectable()
export class PaymentService {
  async createPayment(amount: number, currency: Currency) {
    const rate = await prisma.rate.findUnique({ where: { currency } });
    if (rate == null) {
      throw new Error("No rate");
    }

    const amountPLN = amount * rate.value;

    return prisma.payment.create({
      data: {
        amount,
        amountPLN,
        currency,
      },
    });
  }
}
