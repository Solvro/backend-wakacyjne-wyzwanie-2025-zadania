import * as cheerio from "cheerio";

import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  async scrape(): Promise<unknown> {
    const response = await fetch("https://www.walutomat.pl/kursy-walut");
    const text = await response.text();
    const data = cheerio.load(text);

    const currencies = data(".rates-table__row")
      .map((_, row) => {
        const nameElement = data(row).find(".rates-table__exchange-rate");
        const rateElement = data(row).find("[data-rate-value]");

        if (nameElement.length === 0 || rateElement.length === 0) {
          return null;
        }

        return {
          name: nameElement.text().trim().replaceAll("\u00A0", " "),
          rate: rateElement.text().trim(),
        };
      })
      .get()
      .filter((c) =>
        ["EUR / PLN", "USD / PLN", "CHF / PLN", "GBP / PLN"].includes(c.name),
      )
      .map(({ name, rate }) => {
        const matches = rate.match(/[\d,]+/g) ?? [];

        return {
          name,
          bid:
            typeof matches[0] == "string"
              ? Number.parseFloat(matches[0].replace(",", "."))
              : 0,
          ask:
            typeof matches[1] == "string"
              ? Number.parseFloat(matches[1].replace(",", "."))
              : 0,
        };
      });

    return currencies;
  }

  @Cron("* */30 * * * *")
  handleCron() {
    this.logger.debug("running scrape");
    const response = this.scrape();
    this.logger.debug(response);
  }
}
