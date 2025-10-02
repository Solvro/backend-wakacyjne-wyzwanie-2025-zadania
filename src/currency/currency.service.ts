import type { CurrencyRate } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateCurrencyRateDto } from "./dto/create-currency-rate.dto";

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async getRate(code: string): Promise<number> {
    if (code === "PLN") {
      return 1;
    }

    const row = await this.prisma.currencyRate.findUnique({ where: { code } });
    if (row == null) {
      throw new NotFoundException(`No rate for currency ${code}`);
    }
    return row.rateToPLN;
  }

  async upsertRate(dto: CreateCurrencyRateDto): Promise<CurrencyRate> {
    return this.prisma.currencyRate.upsert({
      where: { code: dto.code },
      update: { rateToPLN: dto.rateToPLN, name: dto.name },
      create: { code: dto.code, rateToPLN: dto.rateToPLN, name: dto.name },
    });
  }

  async upsertRateRaw(
    code: string,
    rateToPLN: number,
    name?: string,
  ): Promise<CurrencyRate> {
    return this.upsertRate({ code, rateToPLN, name });
  }

  async upsertMany(rates: Record<string, number>): Promise<void> {
    await this.prisma.$transaction(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      Object.entries(rates).map(([code, rate]) =>
        this.prisma.currencyRate.upsert({
          where: { code },
          update: { rateToPLN: rate },
          create: { code, rateToPLN: rate },
        }),
      ),
    );
  }
}
