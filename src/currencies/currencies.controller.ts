import { Controller, Get, Param } from "@nestjs/common";

import { CurrenciesService } from "./currencies.service";

@Controller("currencies")
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  async getAllCurrencies() {
    return this.currenciesService.getAllCurrencies();
  }

  @Get(":code")
  async getCurrencyByCode(@Param("code") code: string) {
    return this.currenciesService.getCurrencyByCode(code);
  }
}
