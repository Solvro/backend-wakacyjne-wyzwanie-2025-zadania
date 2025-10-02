import { Currency, PrismaClient } from "@prisma/client";
import puppeteer from "puppeteer";

import { Injectable } from "@nestjs/common";

const prisma = new PrismaClient();

@Injectable()
export class ScraperService {
  async scraping() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.bankbps.pl/kursy-walut?view=currencies", {
      waitUntil: "domcontentloaded",
    });

    const euroSell = await page.evaluate(() => {
      const row = document.querySelector("tr[class='1']");

      if (row == null) {
        return null;
      }

      const cells = row.querySelectorAll("td");
      return cells[2].textContent.trim() || null;
    });

    const dollarSell = await page.evaluate(() => {
      const row = document.querySelector("tr[class='2']");

      if (row == null) {
        return null;
      }

      const cells = row.querySelectorAll("td");
      return cells[2].textContent.trim() || null;
    });

    const kronaSell = await page.evaluate(() => {
      const row = document.querySelector("tr[class='9']");

      if (row == null) {
        return null;
      }

      const cells = row.querySelectorAll("td");
      return cells[2].textContent.trim() || null;
    });

    await browser.close();

    return { euroSell, dollarSell, kronaSell };
  }

  async storeRates() {
    const { euroSell, dollarSell, kronaSell } = await this.scraping();

    const rates = [
      {
        currency: Currency.EUR,
        value:
          euroSell == null
            ? null
            : Number.parseFloat(euroSell.replace(",", ".")),
      },
      {
        currency: Currency.USD,
        value:
          dollarSell == null
            ? null
            : Number.parseFloat(dollarSell.replace(",", ".")),
      },
      {
        currency: Currency.SEK,
        value:
          kronaSell == null
            ? null
            : Number.parseFloat(kronaSell.replace(",", ".")),
      },
    ];

    for (const rate of rates) {
      if (rate.value != null && !Number.isNaN(rate.value)) {
        await prisma.rate.upsert({
          where: { currency: rate.currency },
          create: { currency: rate.currency, value: rate.value },
          update: { value: rate.value },
        });
      }
    }

    return { message: "Rates stored successfully", rates };
  }
}
