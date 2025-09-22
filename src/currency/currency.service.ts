import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { Currency } from "./currency.enum";
import { CreateCurrencyRateDto } from "./dto/create-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(dto: CreateCurrencyRateDto) {
    return this.prisma.currencyRate.upsert({
      where: { code: dto.code },
      update: { rate: dto.rate },
      create: { code: dto.code, rate: dto.rate },
    });
  }

  async findAll() {
    return this.prisma.currencyRate.findMany({
      orderBy: { code: "asc" },
    });
  }

  async findOne(code: Currency) {
    const currency = await this.prisma.currencyRate.findUnique({
      where: { code },
    });

    if (currency == null) {
      throw new NotFoundException(`Currency ${code} not found`);
    }

    return currency;
  }
}
