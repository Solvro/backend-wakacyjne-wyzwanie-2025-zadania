/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as cheerio from "cheerio";

import { Injectable } from "@nestjs/common";

@Injectable()
export class CurrencyService {
  async scrape(): Promise<unknown> {
    const response = await fetch("https://www.walutomat.pl/kursy-walut");
    const text = await response.text();
    const data = cheerio.load(text);

    const currencies = data(".rates-table__row")
      .map((_, row) => {
        const nameElement = data(row).find(".rates-table__exchange-rate");
        const rateElement = data(row).find("[data-rate-value]");

        if (!nameElement.length || !rateElement.length) return null;

        return {
          name: nameElement
            .text()
            .trim()
            .replace(/\u00A0/g, " "),
          rate: rateElement.text().trim(),
        };
      })
      .get()
      .filter((c) =>
        ["EUR / PLN", "USD / PLN", "CHF / PLN", "GBP / PLN"].includes(c!.name),
      )
      .map(({ name, rate }) => {
        const matches = rate.match(/[\d,]+/g) || [];

        return {
          name,
          bid: matches[0] ? parseFloat(matches[0].replace(",", ".")) : null,
          ask: matches[1] ? parseFloat(matches[1].replace(",", ".")) : null,
        };
      });

    return currencies;
  }
}
