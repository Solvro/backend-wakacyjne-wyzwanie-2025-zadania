import { ScraperService } from "src/scraper/scraper.service";

import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private scraperService: ScraperService) {}

  @Cron("*/5 * * * * *")
  async handleMinutelyCurrencyUpdate() {
    this.logger.debug("Called every 5 seconds");
    await this.scraperService.scraping();
    await this.scraperService.storeRates();
  }
}
