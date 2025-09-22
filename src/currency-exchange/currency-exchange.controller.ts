import { Controller, Get } from "@nestjs/common";

import { CurrencyExchangeService } from "./currency-exchange.service";

@Controller("currency-exchange")
export class CurrencyExchangeController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @Get()
  async findAll() {
    return await this.currencyExchangeService.findAll();
  }
}
