import { Currency } from "@prisma/client";
import puppeteer from "puppeteer";

import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { CurrencyService } from "../currency/currency.service";

@Injectable()
export class CurrencyScraperService {
  constructor(private readonly currenciesService: CurrencyService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async scrapeCurrencyRates() {
    if (process.env.NODE_ENV === "test") {
      return;
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/tabela-a/",
    );
    await page.waitForSelector(
      "#main-content > div > section > div > figure > table > tbody > tr:nth-child(2) > td:nth-child(3)",
    );
    const USD = await page.$eval(
      "#main-content > div > section > div > figure > table > tbody > tr:nth-child(2) > td:nth-child(3)",
      (element) => element.textContent,
    );

    await page.goto(
      "https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/tabela-a/",
    );
    await page.waitForSelector(
      "#main-content > div > section > div > figure > table > tbody > tr:nth-child(8) > td:nth-child(3)",
    );
    const EUR = await page.$eval(
      "#main-content > div > section > div > figure > table > tbody > tr:nth-child(8) > td:nth-child(3)",
      (element) => element.textContent,
    );

    await page.goto(
      "https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/tabela-a/",
    );
    await page.waitForSelector(
      "#main-content > div > section > div > figure > table > tbody > tr:nth-child(14) > td:nth-child(3)",
    );
    const CZK = await page.$eval(
      "#main-content > div > section > div > figure > table > tbody > tr:nth-child(14) > td:nth-child(3)",
      (element) => element.textContent,
    );
    await browser.close();

    console.warn(CZK, USD, EUR);
    await this.currenciesService.create({
      currency: Currency.USD,
      value: Number.parseFloat(USD.replace(",", ".")),
    });
    await this.currenciesService.create({
      currency: Currency.EUR,
      value: Number.parseFloat(EUR.replace(",", ".")),
    });
    await this.currenciesService.create({
      currency: Currency.CZK,
      value: Number.parseFloat(CZK.replace(",", ".")),
    });
  }
}
