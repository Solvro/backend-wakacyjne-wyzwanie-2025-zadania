import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { CurrencyService } from "./currency.service";

@Injectable()
export class CurrencyScheduler {
  private readonly logger = new Logger(CurrencyScheduler.name);

  constructor(private readonly currency: CurrencyService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async scrapeJob(): Promise<void> {
    this.logger.log("Start scrapeJob");
    await this.currency.refresh().catch((error: unknown) => {
      this.logger.error(error);
    });
  }
}
