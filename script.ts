/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable no-console */
import { setTimeout } from "node:timers/promises";
import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.x-rates.com/table/?from=PLN&amount=1");

  await setTimeout(5000);

  const data = await page.evaluate(() => {
    const top10Table = document.querySelector(
      "#content > div:nth-child(1) > div > div.col2.pull-right.module.bottomMargin > div.moduleContent > table:nth-child(4) > tbody",
    );

    if (top10Table == null) {
      console.error("Nie znaleziono tabeli Top 10");
      return [];
    }

    const rows = top10Table.querySelectorAll("tbody tr");
    console.log(rows.length);
    const currencies: { waluta: string; wartosc: string }[] = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length >= 3) {
        const waluta = cells[0].textContent.trim() || "";
        const wartosc = cells[2].textContent.trim() || "";
        console.log(waluta, " ", wartosc);

        if (waluta && wartosc) {
          currencies.push({ waluta, wartosc });
        }
      }
    });

    return currencies;
  });
  console.log("✅ Top 10 walut:");
  console.table(data);
  await browser.close();
}

void main();
