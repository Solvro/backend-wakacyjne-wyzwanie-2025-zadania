import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { CurrencyScraperService } from "./currency-scraper.service";

@Injectable()
export class CurrencySchedulerService {
  private readonly logger = new Logger(CurrencySchedulerService.name);

  constructor(private currencyScraperService: CurrencyScraperService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleFrequentUpdate() {
    this.logger.log("Scraping currencies data...");
    await this.currencyScraperService.createCurrencies();
  }
}
