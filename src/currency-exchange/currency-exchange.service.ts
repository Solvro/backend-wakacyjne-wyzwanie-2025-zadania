import { Currency } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { UpdateCurrencyExchangeDto } from "./dto/update-currency-exchange.dto";

@Injectable()
export class CurrencyExchangeService {
  constructor(private database: DatabaseService) {}

  findAll() {
    return this.database.currencyExchange.findMany();
  }

  update(
    currency: Currency,
    updateCurrencyExchangeDto: UpdateCurrencyExchangeDto,
  ) {
    return this.database.currencyExchange.update({
      where: { currency },
      data: {
        exchange: updateCurrencyExchangeDto.exchange,
      },
    });
  }
}
