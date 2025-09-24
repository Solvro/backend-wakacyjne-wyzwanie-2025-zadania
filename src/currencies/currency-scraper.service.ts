import { load } from "cheerio";
import puppeteer, { Browser } from "puppeteer";

import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { ISO_CODES } from "../validators/is-valid-currency-code.validator";
import { CurrenciesService } from "./currencies.service";

@Injectable()
export class CurrencyScraperService {
  constructor(private readonly currencyService: CurrenciesService) {}
  private readonly logger = new Logger(CurrencyScraperService.name);

  @Cron("0 */5 * * * *", {
    disabled: process.env.NODE_ENV === "test",
  })
  async handleCron() {
    await this.scrapeRates();
  }

  async scrapeRates() {
    const browser: Browser = await puppeteer.launch({ headless: true });
    const rates: Record<string, number> = {};
    try {
      const page = await browser.newPage();

      await page.goto("https://www.walutomat.pl/kursy-walut/", {
        waitUntil: "networkidle2",
      });

      const $ = load(await page.content());
      //this.logger.log($.html());

      const rows = $(
        "section.rates-table-container a.rates-table__row",
      ).toArray();

      for (const element of rows) {
        const codeText = $(element)
          .find("p.rates-table__exchange-rate")
          .text()
          .trim();
        const codePair = codeText.split(" / ")[0].replaceAll(/\s/g, "").trim();
        if (!codePair.includes("/PLN")) {
          continue;
        }
        const currency = codePair.split("/")[0].trim();
        const rateText = $(element)
          .find("span.single-rate-element__current-rate_value")
          .first()
          .text()
          .trim();
        const rate = Number.parseFloat(rateText.replace(",", "."));

        this.logger.log(
          `Extracted: Currency="${currency}", Rate="${rateText}" -> ${rate.toString()}`,
        );

        if (ISO_CODES.has(currency.toUpperCase())) {
          rates[currency.toUpperCase()] = rate;
          await this.currencyService.upsertCurrency(
            currency.toUpperCase(),
            rate,
          );
        } else {
          this.logger.warn(
            `Skipped invalid currency or rate: ${currency} - ${rate.toString()}`,
          );
        }
      }
      this.logger.log(`Scraped rates: ${JSON.stringify(rates)}`);
      await browser.close();
      return rates;
    } catch (error) {
      this.logger.error(error);
    } finally {
      await browser.close();
    }
  }
}
