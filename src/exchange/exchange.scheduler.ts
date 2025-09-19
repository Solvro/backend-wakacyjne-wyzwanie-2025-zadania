import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { ExchangeService } from "./exchange.service";

@Injectable()
export class ExchangeScheduler {
  private readonly logger = new Logger(ExchangeScheduler.name);

  constructor(private readonly exchangeService: ExchangeService) {}

  @Cron("0 8 * * 1-5", {
    name: "update-exchange-rates",
    timeZone: "Europe/Warsaw",
  })
  async updateExchangeRates(): Promise<void> {
    try {
      this.logger.log("Starting scheduled exchange rates update...");

      const rates = await this.exchangeService.updateExchangeRates();

      if (rates.length > 0) {
        this.logger.log(
          `Scheduled update completed. Updated ${rates.length} currency rates.`,
        );
      } else {
        this.logger.warn(
          "Scheduled update completed but no rates were updated.",
        );
      }
    } catch (error) {
      this.logger.error("Scheduled exchange rates update failed:", error);
    }
  }

  @Cron("0 8-18 * * 1-5", {
    name: "hourly-exchange-rates-update",
    timeZone: "Europe/Warsaw",
  })
  async hourlyExchangeRatesUpdate(): Promise<void> {
    try {
      this.logger.log("Starting hourly exchange rates update...");

      const rates = await this.exchangeService.updateExchangeRates();

      if (rates.length > 0) {
        this.logger.log(
          `Hourly update completed. Updated ${rates.length} currency rates.`,
        );
      } else {
        this.logger.warn("Hourly update completed but no rates were updated.");
      }
    } catch (error) {
      this.logger.error("Hourly exchange rates update failed:", error);
    }
  }

  async triggerManualUpdate(): Promise<void> {
    try {
      this.logger.log("Manual exchange rates update triggered...");

      const rates = await this.exchangeService.updateExchangeRates();

      if (rates.length > 0) {
        this.logger.log(
          `Manual update completed. Updated ${rates.length} currency rates.`,
        );
      } else {
        this.logger.warn("Manual update completed but no rates were updated.");
      }
    } catch (error) {
      this.logger.error("Manual exchange rates update failed:", error);
      throw error;
    }
  }
}
