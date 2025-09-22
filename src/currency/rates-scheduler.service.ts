import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { CurrencyService } from "./currency.service";
import { RateScraperService } from "./rate-scraper.service";

@Injectable()
export class RatesScheduler {
  private readonly logger = new Logger(RatesScheduler.name);

  constructor(
    private scraper: RateScraperService,
    private currencyService: CurrencyService,
  ) {}

  @Cron(process.env.RATE_SCRAPE_CRON ?? CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.log("Starting scheduled rate fetch");
    try {
      const rates = await this.scraper.fetchRates();
      for (const [code, rate] of Object.entries(rates)) {
        await this.currencyService.upsertRate(code, rate);
      }
      this.logger.log("Rates updated succesfully");
    } catch (error) {
      this.logger.error("Scheduled rate update failed", error);
    }
  }
}
