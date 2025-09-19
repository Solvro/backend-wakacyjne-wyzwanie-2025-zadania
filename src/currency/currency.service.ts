import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(private database: DatabaseService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const currencyInBase = await this.findOne(createCurrencyDto.currencyCode);

    return currencyInBase === null
      ? this.database.currency.create({
          data: {
            currencyCode: createCurrencyDto.currencyCode,
            rate: createCurrencyDto.rate,
          },
        })
      : this.update(createCurrencyDto.currencyCode, createCurrencyDto);
  }

  async findAll() {
    return this.database.currency.findMany();
  }

  async findOne(currencyCode: string) {
    const currency = await this.database.currency.findUnique({
      where: { currencyCode },
    });

    return currency;
  }

  async update(currencyCode: string, updateCurrencyDto: UpdateCurrencyDto) {
    return this.database.currency.update({
      where: { currencyCode },
      data: {
        rate: updateCurrencyDto.rate,
      },
    });
  }

  async remove(currencyCode: string) {
    return this.database.currency.delete({ where: { currencyCode } });
  }
}
