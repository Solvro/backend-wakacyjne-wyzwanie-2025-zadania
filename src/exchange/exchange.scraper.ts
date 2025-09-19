import axios from "axios";

import { Injectable, Logger } from "@nestjs/common";

export interface CurrencyRate {
  currency: string;
  rate: number;
  effectiveDate: string;
}

@Injectable()
export class ExchangeScraper {
  private readonly logger = new Logger(ExchangeScraper.name);
  private readonly nbpApiBaseUrl =
    "https://api.nbp.pl/api/exchangerates/rates/a";

  private readonly currencies = ["USD", "EUR", "GBP", "CHF", "JPY"];

  async fetchCurrentRates(): Promise<CurrencyRate[]> {
    const rates: CurrencyRate[] = [];

    for (const currency of this.currencies) {
      try {
        const rate = await this.fetchCurrencyRate(currency);
        if (rate) {
          rates.push(rate);
        }
      } catch (error) {
        this.logger.error(`Failed to fetch rate for ${currency}:`, error);
      }
    }

    this.logger.log(`Successfully fetched ${rates.length} currency rates`);
    return rates;
  }

  private async fetchCurrencyRate(
    currency: string,
  ): Promise<CurrencyRate | null> {
    try {
      const url = `${this.nbpApiBaseUrl}/${currency.toLowerCase()}/?format=json`;
      this.logger.debug(`Fetching rate for ${currency} from: ${url}`);

      const response = await axios.get(url, {
        timeout: 10_000,
        headers: {
          "User-Agent": "ExchangeRateScraper/1.0",
        },
      });

      if (response.status === 200 && response.data?.rates?.length > 0) {
        const rateData = response.data.rates[0];
        return {
          currency: currency.toUpperCase(),
          rate: rateData.mid,
          effectiveDate: rateData.effectiveDate,
        };
      }

      this.logger.warn(`No rate data found for ${currency}`);
      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          this.logger.warn(`Currency ${currency} not found in NBP API`);
        } else {
          this.logger.error(
            `HTTP error fetching ${currency}: ${error.response?.status} ${error.response?.statusText}`,
          );
        }
      } else {
        this.logger.error(`Unexpected error fetching ${currency}:`, error);
      }
      return null;
    }
  }

  async fetchSpecificRates(currencies: string[]): Promise<CurrencyRate[]> {
    const rates: CurrencyRate[] = [];

    for (const currency of currencies) {
      try {
        const rate = await this.fetchCurrencyRate(currency);
        if (rate) {
          rates.push(rate);
        }
      } catch (error) {
        this.logger.error(`Failed to fetch rate for ${currency}:`, error);
      }
    }

    return rates;
  }

  getSupportedCurrencies(): string[] {
    return [...this.currencies];
  }
}
