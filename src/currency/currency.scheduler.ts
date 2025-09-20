import { Injectable, Logger, OnApplicationShutdown } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";

import { CurrencyService } from "./currency.service";

@Injectable()
export class CurrencyScheduler implements OnApplicationShutdown {
  private readonly logger = new Logger(CurrencyScheduler.name);

  constructor(
    private readonly currency: CurrencyService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async onApplicationShutdown(_?: string) {
    const scraperJob = this.schedulerRegistry.getCronJob("scrapeCurrency");
    await scraperJob.stop();
  }

  @Cron(CronExpression.EVERY_HOUR, { name: "scrapeCurrency" })
  async scrapeJob(): Promise<void> {
    this.logger.log("Start scrapeJob");
    await this.currency.refresh().catch((error: unknown) => {
      this.logger.error(error);
    });
  }
}
