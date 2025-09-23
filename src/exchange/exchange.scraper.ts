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
        if (rate !== null) {
          rates.push(rate);
        }
      } catch (error) {
        this.logger.error(`Failed to fetch rate for ${currency}:`, error);
      }
    }

    this.logger.log(
      `Successfully fetched ${String(rates.length)} currency rates`,
    );
    return rates;
  }

  private async fetchCurrencyRate(
    currency: string,
  ): Promise<CurrencyRate | null> {
    try {
      const url = `${this.nbpApiBaseUrl}/${currency.toLowerCase()}/?format=json`;
      this.logger.debug(`Fetching rate for ${currency} from: ${url}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10_000);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "ExchangeRateScraper/1.0",
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data: unknown = await response.json();
        const rates = (
          data as { rates?: { mid?: number; effectiveDate?: string }[] }
        ).rates;
        if (Array.isArray(rates) && rates.length > 0) {
          const rateData = rates[0] as { mid?: number; effectiveDate?: string };
          if (
            typeof rateData.mid === "number" &&
            typeof rateData.effectiveDate === "string"
          ) {
            return {
              currency: currency.toUpperCase(),
              rate: rateData.mid,
              effectiveDate: rateData.effectiveDate,
            };
          }
        }
      }

      this.logger.warn(`No rate data found for ${currency}`);
      return null;
    } catch (error) {
      const error_ = error as Error & { name?: string };
      if (error_.name === "AbortError") {
        this.logger.error(`HTTP error fetching ${currency}: request timeout`);
      } else {
        this.logger.error(
          `Unexpected error fetching ${currency}: ${error_.message}`,
        );
      }
      return null;
    }
  }

  async fetchSpecificRates(currencies: string[]): Promise<CurrencyRate[]> {
    const rates: CurrencyRate[] = [];

    for (const currency of currencies) {
      try {
        const rate = await this.fetchCurrencyRate(currency);
        if (rate !== null) {
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
