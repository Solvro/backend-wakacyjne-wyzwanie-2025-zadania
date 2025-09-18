import puppeteer from "puppeteer";

import { Injectable } from "@nestjs/common";

@Injectable()
export class CurrencyScraperService {
  async scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.walutomat.pl/kursy-walut");

    await page.waitForSelector(".rates-table");

    const currencies = await page.evaluate(() => {
      const rows = document.querySelectorAll(".rates-table__row");
      return (
        [...rows]
          .map((row) => {
            const nameElement = row.querySelector(
              ".rates-table__exchange-rate",
            );
            const rateElement = row.querySelector("[data-rate-value]");
            if (nameElement == null || rateElement == null) {
              return null;
            }
            return {
              name: nameElement.textContent.trim(),
              rate: rateElement.textContent.trim(),
            };
          })
          .filter(Boolean)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .filter((c) =>
            ["EUR / PLN", "USD / PLN", "CHF / PLN", "GBP / PLN"].includes(
              c!.name.replaceAll("\u00A0", " "),
            ),
          )
      );
    });

    console.warn(currencies);

    await browser.close();
  }
}
