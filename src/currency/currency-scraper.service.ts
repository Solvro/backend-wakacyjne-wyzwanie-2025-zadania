import puppeteer from "puppeteer";

import { Injectable } from "@nestjs/common";

import { CurrencyService } from "./currency.service";

@Injectable()
export class CurrencyScraperService {
  constructor(private currencyService: CurrencyService) {}
  async scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.walutomat.pl/kursy-walut");

    await page.waitForSelector(".rates-table");

    const currencies = await page.evaluate(() => {
      const rows = document.querySelectorAll(".rates-table__row");
      return [...rows]
        .map((row) => {
          const nameElement = row.querySelector(".rates-table__exchange-rate");
          const rateElement = row.querySelector("[data-rate-value]");
          if (nameElement == null || rateElement == null) {
            return null;
          }
          return {
            currencyCode: nameElement.textContent.trim(),
            rate: Number(
              rateElement.textContent
                .replace("PLN", "")
                .replace(",", ".")
                .trim(),
            ),
          };
        })
        .filter(Boolean)
        .filter((c) =>
          ["EUR / PLN", "USD / PLN", "CHF / PLN", "GBP / PLN"].includes(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            c!.currencyCode.replaceAll("\u00A0", " "),
          ),
        );
    });

    for (const currency of currencies) {
      if (currency != null) {
        currency.currencyCode = currency.currencyCode.split("\u00A0/\u00A0")[0];
      }
    }

    await browser.close();

    return currencies;
  }

  async createCurrencies() {
    const currencies = await this.scrape();

    for (const currency of currencies) {
      if (currency != null) {
        await this.currencyService.create(currency);
      }
    }
  }
}
