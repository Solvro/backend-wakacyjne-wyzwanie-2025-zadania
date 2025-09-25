import * as cheerio from "cheerio";

import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RateScraperService {
  private readonly logger = new Logger(RateScraperService.name);

  private readonly currencyMap: Record<string, string> = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
  };

  async fetchRates(): Promise<Record<string, number>> {
    const response = await fetch(
      "https://www.x-rates.com/table/?from=PLN&amount=1",
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch rates: ${response.status.toString()}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const rates: Record<string, number> = {};

    const table = $(
      "#content .col2.pull-right.module .moduleContent table.ratesTable tbody",
    );

    if (table.length === 0) {
      throw new Error("Currency table not found");
    }

    table.find("tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length >= 3) {
        const rowName = $(cells[0]).text().trim();

        for (const [code, currencyName] of Object.entries(this.currencyMap)) {
          if (rowName === currencyName) {
            const rateString = $(cells[2]).text().trim();
            const parsed = Number.parseFloat(rateString);

            if (Number.isNaN(parsed)) {
              this.logger.warn(`Could not parse rate for ${code}`);
            } else {
              rates[code] = parsed;
            }
          }
        }
      }
    });

    if (Object.keys(rates).length === 0) {
      this.logger.error("No valid currency rates were parsed");
    } else {
      this.logger.log(`Fetched rates: ${JSON.stringify(rates)}`);
    }

    return rates;
  }
}
