// 👇 Import Prisma-generated model type here
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

  async upsertRate(
    dtoOrCode: CreateCurrencyRateDto | string,
    rateToPLN?: number,
    name?: string,
  ): Promise<CurrencyRate> {
    let code: string;
    let rate: number;
    let nm: string | undefined;

    if (typeof dtoOrCode === "string") {
      code = dtoOrCode;
      rate = rateToPLN ?? 0;
      nm = name;
    } else {
      code = dtoOrCode.code;
      rate = dtoOrCode.rateToPLN;
      nm = dtoOrCode.name;
    }

    return await this.prisma.currencyRate.upsert({
      where: { code },
      update: { rateToPLN: rate, name: nm },
      create: { code, rateToPLN: rate, name: nm },
    });
  }
}
