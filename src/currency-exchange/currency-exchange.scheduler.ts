import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { CurrencyExchangeScrapper } from "./currency-exchange.scraper";

@Injectable()
export class CurrencyExchangeScheduler {
  constructor(private readonly scrapper: CurrencyExchangeScrapper) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async updateExchangeRates(): Promise<void> {
    await this.scrapper.fetchCurrencyRates();
  }
}
