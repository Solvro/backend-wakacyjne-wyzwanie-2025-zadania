import * as cheerio from "cheerio";

import { Injectable, Logger } from "@nestjs/common";

export const currencyMap: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
};

@Injectable()
export class RateScraperService {
  private readonly logger = new Logger(RateScraperService.name);

  private readonly nameToCode: Map<string, string>;

  constructor() {
    this.nameToCode = new Map(
      Object.entries(currencyMap).map(([code, name]) => [name, code]),
    );
  }

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
    const expectedCount = Object.keys(currencyMap).length;

    const table = $(
      "#content .col2.pull-right.module .moduleContent table.ratesTable tbody",
    );

    if (table.length === 0) {
      throw new Error("Currency table not found");
    }

    let foundCount = 0;
    const rows = table.find("tr").toArray();
    for (const row of rows) {
      if (foundCount >= expectedCount) {
        break;
      }

      const cells = $(row).find("td");
      if (cells.length < 3) {
        this.logger.warn("Unexpected table row structure, skipping");
        continue;
      }

      const rowName = $(cells[0]).text().trim();
      const code = this.nameToCode.get(rowName);

      if (code == null) {
        continue;
      }

      if (code in rates) {
        this.logger.warn(`Duplicate rate found for ${code}, skipping`);
        continue;
      }

      const rateString = $(cells[2]).text().trim();
      const parsed = Number.parseFloat(rateString);

      if (Number.isNaN(parsed)) {
        this.logger.warn(`Could not parse rate for ${code}`);
        continue;
      }
      rates[code] = parsed;
      foundCount++;
    }

    for (const wantedCode of Object.keys(currencyMap)) {
      if (!(wantedCode in rates)) {
        this.logger.warn(`Rate not found for ${wantedCode}`);
      }
    }

    if (foundCount === 0) {
      throw new Error("No valid currency rates were parsed – scraping failed");
    } else {
      this.logger.log(`Fetched rates: ${JSON.stringify(rates)}`);
    }

    return rates;
  }
}
