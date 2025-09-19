import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { CreateCurrencyDto } from "./dto/create-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(private database: DatabaseService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    return this.database.currency.create({
      data: {
        currency: createCurrencyDto.currency,
        value: createCurrencyDto.value,
        timeStamp: createCurrencyDto.timeStamp,
      },
    });
  }
}
