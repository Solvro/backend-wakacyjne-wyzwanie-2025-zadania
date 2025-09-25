import { Inject, Injectable, Logger } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CURRENCY_SCRAPER } from "./tokens";

export interface CurrencySample {
  quote: string;
  rate: number;
  source?: string;
  collectedAt: Date;
}

export interface CurrencyScraper {
  scrape: (quoteSymbols: string[], base?: string) => Promise<CurrencySample[]>;
}

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CURRENCY_SCRAPER) private readonly scraper: CurrencyScraper,
  ) {}

  async refresh(quotes = this.defaultQuotes()): Promise<void> {
    const samples = await this.scraper.scrape(quotes, "PLN");
    if (samples.length === 0) {
      this.logger.warn("brak próbek kursów zewnętrznego źródła");
      return;
    }
    await this.prisma.$transaction(async (tx) => {
      for (const s of samples) {
        await tx.currencyRate.create({
          data: {
            base: "PLN",
            quote: s.quote,
            rate: s.rate,
            source: s.source ?? "unknown",
            collectedAt: s.collectedAt,
          },
        });
      }
    });
  }

  async getLatestRate(quote: string, base = "PLN"): Promise<number | null> {
    const row = await this.prisma.currencyRate.findFirst({
      where: { base, quote },
      orderBy: { collectedAt: "desc" },
    });
    if (row === null) {
      return null;
    }
    return Number(row.rate);
  }

  private defaultQuotes(): string[] {
    return ["EUR", "USD", "AUD", "CAD", "GBP", "CHF"];
  }
}
