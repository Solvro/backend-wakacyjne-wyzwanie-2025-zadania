import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { PrismaService } from "../prisma/prisma.service";
import type { NBPRate, NBPResponse } from "./dto/forex.dto";
import { FetchRatesResponseDto, ForexRateDto } from "./dto/forex.dto";

@Injectable()
export class ForexService {
  private readonly logger = new Logger(ForexService.name);
  private readonly NBP_API_BASE_URL = "https://api.nbp.pl/api/exchangerates";
  private readonly TARGET_CURRENCIES = ["USD", "EUR", "GBP"];

  constructor(private readonly prisma: PrismaService) {}

  async fetchCurrentRates(): Promise<FetchRatesResponseDto> {
    this.logger.log("Starting to fetch current currency rates from NBP API");

    try {
      // Fetch the current table A (average rates) from NBP
      const response = await fetch(
        `${this.NBP_API_BASE_URL}/tables/a?format=json`,
      );

      if (!response.ok) {
        throw new BadRequestException(
          `NBP API returned status ${String(response.status)}: ${response.statusText}`,
        );
      }

      const data = (await response.json()) as NBPResponse[];

      if (!Array.isArray(data) || data.length === 0) {
        throw new BadRequestException("No data received from NBP API");
      }

      const tableData = data[0];
      const filteredRates = tableData.rates.filter((rate) =>
        this.TARGET_CURRENCIES.includes(rate.code),
      );

      if (filteredRates.length === 0) {
        throw new BadRequestException(
          "No target currencies found in NBP response",
        );
      }

      // Save rates to database
      const savedRates = await this.saveRatesToDatabase(filteredRates);
      const fetchedAt = new Date().toISOString();

      this.logger.log(
        `Successfully fetched and saved ${String(savedRates.length)} currency rates`,
      );

      return {
        fetchedCount: savedRates.length,
        rates: savedRates,
        fetchedAt,
      };
    } catch (error) {
      this.logger.error("Failed to fetch currency rates", error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        "Failed to fetch currency rates from external API",
      );
    }
  }

  private async saveRatesToDatabase(rates: NBPRate[]): Promise<ForexRateDto[]> {
    const savedRates: ForexRateDto[] = [];

    for (const rate of rates) {
      try {
        const savedRate = await this.prisma.forexRate.create({
          data: {
            currencyName: rate.code,
            rate: rate.mid,
            fetchedAt: new Date(),
          },
        });

        savedRates.push({
          currencyName: savedRate.currencyName,
          rate: savedRate.rate,
          fetchedAt: savedRate.fetchedAt.toISOString(),
        });

        this.logger.debug(
          `Saved rate for ${rate.code}: ${String(rate.mid)} PLN`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to save rate for currency ${rate.code}`,
          error,
        );
        // Continue with other currencies even if one fails
      }
    }

    return savedRates;
  }

  async getLatestRates(): Promise<ForexRateDto[]> {
    this.logger.log("Fetching latest currency rates from database");

    try {
      // Get the most recent rates for each currency
      const rates = await this.prisma.$queryRaw<
        {
          currencyName: string;
          rate: number;
          fetchedAt: Date;
        }[]
      >`
        SELECT DISTINCT ON ("currencyName") 
          "currencyName", 
          "rate", 
          "fetchedAt"
        FROM "ForexRate" 
        WHERE "currencyName" IN ('USD', 'EUR', 'GBP')
        ORDER BY "currencyName", "fetchedAt" DESC
      `;

      return rates.map((rate) => ({
        currencyName: rate.currencyName,
        rate: rate.rate,
        fetchedAt: rate.fetchedAt.toISOString(),
      }));
    } catch (error) {
      this.logger.error("Failed to fetch latest rates from database", error);
      throw new BadRequestException("Failed to fetch latest currency rates");
    }
  }

  async getRatesHistory(
    currencyCode?: string,
    limit = 10,
  ): Promise<ForexRateDto[]> {
    this.logger.log(
      `Fetching rates history for ${currencyCode ?? "all currencies"} with limit ${String(limit)}`,
    );

    try {
      const whereClause =
        currencyCode === undefined
          ? {
              currencyName: {
                in: this.TARGET_CURRENCIES,
              },
            }
          : { currencyName: currencyCode.toUpperCase() };

      const rates = await this.prisma.forexRate.findMany({
        where: whereClause,
        orderBy: {
          fetchedAt: "desc",
        },
        take: limit,
      });

      return rates.map((rate) => ({
        currencyName: rate.currencyName,
        rate: rate.rate,
        fetchedAt: rate.fetchedAt.toISOString(),
      }));
    } catch (error) {
      this.logger.error("Failed to fetch rates history from database", error);
      throw new BadRequestException("Failed to fetch currency rates history");
    }
  }

  // Scheduled Tasks

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async fetchRatesDaily(): Promise<void> {
    this.logger.log("Running scheduled daily currency rates fetch at 9:00 AM");
    try {
      const result = await this.fetchCurrentRates();
      this.logger.log(
        `Scheduled fetch completed successfully: ${String(result.fetchedCount)} rates updated`,
      );
    } catch (error) {
      this.logger.error("Scheduled daily currency rates fetch failed", error);
    }
  }

  @Cron("0 14 * * 1-5") // Every weekday at 2:00 PM
  async fetchRatesWeekdayAfternoon(): Promise<void> {
    this.logger.log(
      "Running scheduled weekday currency rates fetch at 2:00 PM",
    );
    try {
      const result = await this.fetchCurrentRates();
      this.logger.log(
        `Scheduled weekday fetch completed successfully: ${String(result.fetchedCount)} rates updated`,
      );
    } catch (error) {
      this.logger.error("Scheduled weekday currency rates fetch failed", error);
    }
  }

  @Cron("0 0 * * 1") // Every Monday at midnight
  async weeklyMaintenanceTask(): Promise<void> {
    this.logger.log("Running weekly forex data maintenance task");
    try {
      // Clean up old rates (older than 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const deletedCount = await this.prisma.forexRate.deleteMany({
        where: {
          fetchedAt: {
            lt: thirtyDaysAgo,
          },
        },
      });

      this.logger.log(
        `Weekly maintenance completed: ${String(deletedCount.count)} old rates cleaned up`,
      );
    } catch (error) {
      this.logger.error("Weekly maintenance task failed", error);
    }
  }
}
