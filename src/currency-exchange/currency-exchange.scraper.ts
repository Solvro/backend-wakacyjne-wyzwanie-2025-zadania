import { Currency } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { CurrencyExchangeService } from "./currency-exchange.service";

@Injectable()
export class CurrencyExchangeScrapper {
  constructor(private service: CurrencyExchangeService) {}

  async fetchCurrencyRates(): Promise<void> {
    try {
      const response = await fetch(
        "https://api.nbp.pl/api/exchangerates/tables/A?format=json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status.toString()}`);
      }

      const data = (await response.json()) as any[];
      const rates: Record<string, number> = {};

      for (const rate of data[0].rates) {
        rates[rate.code.toUpperCase()] = rate.mid;
      }

      const currencies = Object.values(Currency).filter(
        (v) => typeof v === "string",
      ) as Currency[];

      await Promise.all(
        currencies.map(async (currency) => {
          const code = currency.toString().toUpperCase();
          const rate = rates[code];
          if (rate) {
            await this.service.update(currency, { exchange: rate });
          } else {
            console.warn(`Brak kursu dla ${currency.toString()}`);
          }
        }),
      );
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  }
}
