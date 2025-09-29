import puppeteer from "puppeteer";

import { Injectable } from "@nestjs/common";

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
}
