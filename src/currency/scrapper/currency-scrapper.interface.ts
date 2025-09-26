export interface CurrencySample {
  quote: string;
  rate: number;
  source?: string;
  collectedAt: Date;
}

export interface CurrencyScrapper {
  scrape: (quoteSymbols: string[], base?: string) => Promise<CurrencySample[]>;
}
