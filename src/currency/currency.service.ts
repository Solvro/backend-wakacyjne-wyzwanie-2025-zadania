import { Currencies } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CurrencySelectDTO } from "./dto/currency-select.dto";

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.currencyRate.findMany();
  }

  async findLatest() {
    const result: Record<
      string,
      { currency: string; rate: number; timestamp: Date }
    > = {};
    for (const currency of Object.values(Currencies)) {
      const latest = await this.prisma.currencyRate.findFirst({
        where: { currency },
        orderBy: { timestamp: "desc" },
      });
      if (latest != null) {
        result[currency] = {
          currency: latest.currency,
          rate: Number(latest.rate),
          timestamp: latest.timestamp,
        };
      }
    }
    return result;
  }

  async findLatestForCurrency(currency: CurrencySelectDTO) {
    return await this.prisma.currencyRate.findFirst({
      where: { currency: currency.currency },
      orderBy: { timestamp: "desc" },
    });
  }
}
