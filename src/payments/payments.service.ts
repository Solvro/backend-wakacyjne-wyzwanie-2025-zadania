import { BadRequestException, Injectable } from "@nestjs/common";

import { CurrenciesService } from "../currencies/currencies.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private currenciesService: CurrenciesService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { amount, currency } = createPaymentDto;

    if (currency.toUpperCase() === "PLN") {
      return await this.prisma.payment.create({
        data: {
          originalAmount: amount,
          amountInPLN: amount,
          exchangeRate: 1,
          originalCurrency: {
            connectOrCreate: {
              where: { code: "PLN" },
              create: {
                code: "PLN",
                name: "Polish Zloty",
                rate: 1,
              },
            },
          },
        },
        include: {
          originalCurrency: true,
        },
      });
    }

    const currencyData =
      await this.currenciesService.getCurrencyByCode(currency);
    if (currencyData === null) {
      throw new BadRequestException(
        `Currency ${currency} not found. Available currencies can be checked at /currencies`,
      );
    }

    const amountInPLN = amount * currencyData.rate;

    return await this.prisma.payment.create({
      data: {
        originalAmount: amount,
        amountInPLN,
        exchangeRate: currencyData.rate,
        originalCurrency: {
          connect: { id: currencyData.id },
        },
      },
      include: {
        originalCurrency: true,
      },
    });
  }

  async getAllPayments() {
    return await this.prisma.payment.findMany({
      include: {
        originalCurrency: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getPaymentById(id: number) {
    return await this.prisma.payment.findUnique({
      where: { id },
      include: {
        originalCurrency: true,
      },
    });
  }
}
