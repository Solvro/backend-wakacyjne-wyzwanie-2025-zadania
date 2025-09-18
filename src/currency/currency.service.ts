import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(private database: DatabaseService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    return this.database.currency.create({
      data: {
        currencyCode: createCurrencyDto.currencyCode,
        value: createCurrencyDto.value,
      },
    });
  }

  async findAll() {
    return this.database.currency.findMany();
  }

  async findOne(id: number) {
    const currency = await this.database.currency.findUnique({
      where: { id },
    });

    if (currency == null) {
      throw new NotFoundException("Currency was not found");
    }
    return currency;
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.database.currency.update({
      where: { id },
      data: {
        value: updateCurrencyDto.value,
      },
    });
  }

  async remove(id: number) {
    return this.database.currency.delete({ where: { id } });
  }
}
