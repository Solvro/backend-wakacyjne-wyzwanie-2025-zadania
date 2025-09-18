import { setTimeout } from "node:timers/promises";
import puppeteer from "puppeteer";

import { Injectable } from "@nestjs/common";

import { CreateCurrencyDto } from "../currency/dto/create-currency.dto";

@Injectable()
export class ScrapperService {
  async scrapeTop10currencies(): Promise<CreateCurrencyDto[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.x-rates.com/table/?from=PLN&amount=1");

    await setTimeout(5000);
    const timestamp = new Date();
    const data = await page.evaluate((browserTimestamp) => {
      const top10Table = document.querySelector(
        "#content > div:nth-child(1) > div > div.col2.pull-right.module.bottomMargin > div.moduleContent > table:nth-child(4) > tbody",
      );

      if (top10Table == null) {
        console.error("Nie znaleziono tabeli Top 10");
        return [];
      }

      const rows = top10Table.querySelectorAll("tbody tr");
      const currencies: CreateCurrencyDto[] = [];

      for (const row of rows) {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 3) {
          const name = cells[0].textContent.trim() || "";
          const value = cells[2].textContent.trim() || "";

          if (name && value) {
            currencies.push({
              name,
              value: Number.parseFloat(value),
              timestamp: browserTimestamp,
            });
          }
        }
      }

      return currencies;
    }, timestamp);
    await browser.close();
    return data;
  }
}
