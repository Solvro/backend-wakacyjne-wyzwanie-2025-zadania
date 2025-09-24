import * as cheerio from "cheerio";

import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);

  constructor(private prisma: PrismaService) {}

  async getAllCurrencies() {
    return await this.prisma.currency.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async getCurrencyByCode(code: string) {
    return await this.prisma.currency.findUnique({
      where: { code: code.toUpperCase() },
    });
  }

  async getExchangeRate(currencyCode: string): Promise<number> {
    const currency = await this.getCurrencyByCode(currencyCode);
    if (currency == null) {
      throw new Error(`Currency ${currencyCode} not found`);
    }
    return currency.rate;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async scrapeCurrencyRates() {
    this.logger.log("Starting currency rates scraping...");

    try {
      const response = await fetch(
        "https://www.bankbps.pl/kursy-walut?view=currencies",
      );
      const html = await response.text();
      const $ = cheerio.load(html);

      const currencyPromises: Promise<unknown>[] = [];
      const targetCurrencies = ["USD", "EUR", "GBP"];

      $("table tr").each((_index, element) => {
        const cells = $(element).find("td");
        if (cells.length >= 3) {
          const currencyCode = $(cells[0]).text().trim();
          const rateText = $(cells[2]).text().trim();

          if (targetCurrencies.includes(currencyCode) && rateText) {
            const rate = Number.parseFloat(
              rateText.replace(",", ".").replaceAll(/[^\d.-]/g, ""),
            );

            if (!Number.isNaN(rate) && rate > 0) {
              currencyPromises.push(
                this.updateCurrencyRate(currencyCode, rate),
              );
            }
          }
        }
      });

      if (currencyPromises.length === 0) {
        $(".currency-row, .rate-row, [data-currency]").each(
          (_index, element) => {
            const text = $(element).text();
            for (const currency of targetCurrencies) {
              if (text.includes(currency)) {
                const rateMatch = /(\d+[,.]?\d*)/.exec(text);
                if (rateMatch != null) {
                  const rate = Number.parseFloat(
                    rateMatch[1].replace(",", "."),
                  );
                  if (!Number.isNaN(rate) && rate > 0) {
                    currencyPromises.push(
                      this.updateCurrencyRate(currency, rate),
                    );
                  }
                }
              }
            }
          },
        );
      }

      if (currencyPromises.length === 0) {
        this.logger.warn(
          "No currency data found on page, using fallback rates",
        );
        currencyPromises.push(
          this.updateCurrencyRate("USD", 4.12),
          this.updateCurrencyRate("EUR", 4.45),
          this.updateCurrencyRate("GBP", 5.18),
        );
      }

      await Promise.all(currencyPromises);
      this.logger.log(
        `Successfully updated ${String(currencyPromises.length)} currency rates`,
      );
    } catch (error) {
      this.logger.error("Error scraping currency rates:", error);

      try {
        await this.ensureBasicCurrencies();
      } catch (fallbackError) {
        this.logger.error("Error setting fallback currencies:", fallbackError);
      }
    }
  }

  private async updateCurrencyRate(code: string, rate: number) {
    const currencyName = this.getCurrencyName(code);

    return this.prisma.currency.upsert({
      where: { code },
      update: { rate },
      create: {
        code,
        name: currencyName,
        rate,
      },
    });
  }

  private async ensureBasicCurrencies() {
    const basicCurrencies = [
      { code: "USD", name: "US Dollar", rate: 4.12 },
      { code: "EUR", name: "Euro", rate: 4.45 },
      { code: "GBP", name: "British Pound", rate: 5.18 },
    ];

    for (const currency of basicCurrencies) {
      await this.prisma.currency.upsert({
        where: { code: currency.code },
        update: { rate: currency.rate },
        create: currency,
      });
    }
  }

  private getCurrencyName(code: string): string {
    const currencyNames: Record<string, string> = {
      USD: "US Dollar",
      EUR: "Euro",
      GBP: "British Pound",
      CHF: "Swiss Franc",
      JPY: "Japanese Yen",
      CAD: "Canadian Dollar",
      AUD: "Australian Dollar",
    };
    return currencyNames[code] ?? code;
  }
}
