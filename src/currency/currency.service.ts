import { Currency } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(private database: DatabaseService) {}
  async create(createCurrencyDto: CreateCurrencyDto) {
    return await this.database.exchangeRate.create({
      data: {
        currency: createCurrencyDto.currency,
        exchange_rate: createCurrencyDto.value,
      },
    });
  }

  async findAll() {
    return this.database.exchangeRate.findMany();
  }

  async findByCurrency(currency: Currency) {
    if (currency === Currency.PLN) {
      return 1;
    }
    const latest = await this.database.exchangeRate.findFirst({
      where: { currency },
      orderBy: { timestamp: "desc" },
    });

    if (latest === null) {
      throw new Error(`No exchange rate saved for ${currency}`);
    }
    return Number(latest.exchange_rate);
  }
}
