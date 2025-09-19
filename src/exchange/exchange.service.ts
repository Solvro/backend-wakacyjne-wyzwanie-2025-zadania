import { Injectable, Logger } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CurrencyRate, ExchangeScraper } from "./exchange.scraper";

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly exchangeScraper: ExchangeScraper,
  ) {}

  async updateExchangeRates(): Promise<CurrencyRate[]> {
    try {
      this.logger.log("Starting exchange rates update...");

      const rates = await this.exchangeScraper.fetchCurrentRates();

      if (rates.length === 0) {
        this.logger.warn("No exchange rates fetched");
        return [];
      }

      const savedRates = await this.saveRatesToDatabase(rates);

      this.logger.log(
        `Successfully updated ${String(savedRates.length)} exchange rates`,
      );
      return savedRates;
    } catch (error) {
      this.logger.error("Failed to update exchange rates:", error);
      throw error;
    }
  }

  private async saveRatesToDatabase(
    rates: CurrencyRate[],
  ): Promise<CurrencyRate[]> {
    const savedRates: CurrencyRate[] = [];

    for (const rate of rates) {
      try {
        const savedRate = await this.prisma.currencyRate.create({
          data: {
            currency: rate.currency,
            rate: rate.rate,
          },
        });

        savedRates.push({
          currency: savedRate.currency,
          rate: savedRate.rate,
          effectiveDate: savedRate.createdAt.toISOString().split("T")[0],
        });
      } catch (error) {
        this.logger.error(`Failed to save rate for ${rate.currency}:`, error);
      }
    }

    return savedRates;
  }

  async getLatestRates(
    limit = 1,
  ): Promise<
    { id: number; currency: string; rate: number; createdAt: Date }[]
  > {
    try {
      const rates = await this.prisma.currencyRate.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: limit * this.exchangeScraper.getSupportedCurrencies().length,
      });

      return rates as {
        id: number;
        currency: string;
        rate: number;
        createdAt: Date;
      }[];
    } catch (error) {
      this.logger.error("Failed to get latest rates:", error);
      throw error;
    }
  }

  async getRatesForCurrency(
    currency: string,
    limit = 10,
  ): Promise<
    { id: number; currency: string; rate: number; createdAt: Date }[]
  > {
    try {
      const rates = await this.prisma.currencyRate.findMany({
        where: {
          currency: currency.toUpperCase(),
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
      });

      return rates as {
        id: number;
        currency: string;
        rate: number;
        createdAt: Date;
      }[];
    } catch (error) {
      this.logger.error(`Failed to get rates for ${currency}:`, error);
      throw error;
    }
  }

  async getRate(currency: string): Promise<number> {
    const latestRate = await this.prisma.currencyRate.findFirst({
      where: { currency: currency.toUpperCase() },
      orderBy: { createdAt: "desc" },
    });

    if (latestRate === null) {
      throw new Error(`No rate found for ${currency}`);
    }

    return latestRate.rate;
  }

  getSupportedCurrencies(): string[] {
    return this.exchangeScraper.getSupportedCurrencies();
  }

  async updateSpecificRates(currencies: string[]): Promise<CurrencyRate[]> {
    try {
      this.logger.log(
        `Updating rates for currencies: ${currencies.join(", ")}`,
      );

      const rates = await this.exchangeScraper.fetchSpecificRates(currencies);

      if (rates.length === 0) {
        this.logger.warn("No exchange rates fetched for specified currencies");
        return [];
      }

      const savedRates = await this.saveRatesToDatabase(rates);

      this.logger.log(
        `Successfully updated ${String(savedRates.length)} specific exchange rates`,
      );
      return savedRates;
    } catch (error) {
      this.logger.error("Failed to update specific exchange rates:", error);
      throw error;
    }
  }
}
