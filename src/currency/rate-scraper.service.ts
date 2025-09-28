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

  private readonly nameToCode: Map<string, string>;

  constructor() {
    this.nameToCode = new Map(
      Object.entries(this.currencyMap).map(([code, name]) => [name, code]),
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
    const expectedCount = Object.keys(this.currencyMap).length;

    const table = $(
      "#content .col2.pull-right.module .moduleContent table.ratesTable tbody",
    );

    if (table.length === 0) {
      throw new Error("Currency table not found");
    }

    table.find("tr").each((_, row) => {
      if (Object.keys(rates).length >= expectedCount) {
        return false;
      }

      const cells = $(row).find("td");
      if (cells.length < 3) {
        return;
      }

      const rowName = $(cells[0]).text().trim();
      const code = this.nameToCode.get(rowName);

      if (code == null) {
        return;
      }

      if (Object.hasOwn(rates, code)) {
        return;
      }

      const rateString = $(cells[2]).text().trim();
      const parsed = Number.parseFloat(rateString);

      if (Number.isNaN(parsed)) {
        this.logger.warn(`Could not parse rate for ${code}`);
        return;
      }
      rates[code] = parsed;
    });

    for (const wantedCode of Object.keys(this.currencyMap)) {
      if (!(wantedCode in rates)) {
        this.logger.warn(`Rate not found for ${wantedCode}`);
      }
    }

    if (Object.keys(rates).length === 0) {
      this.logger.error("No valid currency rates were parsed");
    } else {
      this.logger.log(`Fetched rates: ${JSON.stringify(rates)}`);
    }

    return rates;
  }
}
