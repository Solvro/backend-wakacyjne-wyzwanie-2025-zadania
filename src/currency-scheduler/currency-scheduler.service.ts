import { CurrencyName } from "@prisma/client";
import * as cheerio from "cheerio";
import { CurrencyService } from "src/currency/currency.service";

import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

async function scraper() {
  const $ = await cheerio.fromURL(
    "https://www.bankbps.pl/kursy-walut?view=currencies",
  );

  const $USD = $("th.rate.rate-USD").closest("tr");

  const $USD_value = $USD
    .find("td.uk-text-bold.uk-text-center.uk-text-primary")
    .eq(1)
    .text();

  const $EUR = $("th.rate.rate-EUR").closest("tr");

  const $EUR_value = $EUR
    .find("td.uk-text-bold.uk-text-center.uk-text-primary")
    .eq(1)
    .text();

  const $GBP = $("th.rate.rate-GBP").closest("tr");

  const $GBP_value = $GBP
    .find("td.uk-text-bold.uk-text-center.uk-text-primary")
    .eq(1)
    .text();

  const values = { USD: $USD_value, EUR: $EUR_value, GBP: $GBP_value };

  return values;
}

@Injectable()
export class CurrencySchedulerService {
  private readonly logger = new Logger(CurrencySchedulerService.name);

  constructor(private currencyService: CurrencyService) {}

  @Cron("0 0 * * *")
  async handleDailyCurrencyReport() {
    this.logger.log("Generuję dzienny raport");
    const response = await scraper();
    const today = new Date();
    today.setHours(2, 0, 0, 0);
    const usd = {
      currency: CurrencyName.USD,
      value: Number.parseFloat(response.USD),
      timeStamp: today,
    };
    const eur = {
      currency: CurrencyName.EUR,
      value: Number.parseFloat(response.EUR),
      timeStamp: today,
    };
    const gbp = {
      currency: CurrencyName.GBP,
      value: Number.parseFloat(response.GBP),
      timeStamp: today,
    };
    await this.currencyService.create(usd);
    await this.currencyService.create(eur);
    await this.currencyService.create(gbp);
  }
}
