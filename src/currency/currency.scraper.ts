/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import axios from "axios";

import { Injectable, Logger } from "@nestjs/common";

import { Currency } from "./currency.enum";
import { CurrencyService } from "./currency.service";

@Injectable()
export class CurrencyScraper {
  private readonly logger = new Logger(CurrencyScraper.name);

  constructor(private readonly currencyService: CurrencyService) {}

  async scrape() {
    this.logger.log("Starting currency scrape...");

    const currencies: Currency[] = [Currency.EUR, Currency.USD, Currency.GBP];

    for (const code of currencies) {
      const url = `https://api.nbp.pl/api/exchangerates/rates/A/${code}/?format=json`;

      try {
        const response = await axios.get(url);
        const rate = response.data.rates[0].mid;

        await this.currencyService.create({ code, rate });
        this.logger.log(`Saved ${code} = ${rate}`);
      } catch (error) {
        this.logger.warn(`Failed to fetch rate for ${code}: ${error.message}`);
      }
    }

    this.logger.log("Currency scrape finished.");
  }
}
