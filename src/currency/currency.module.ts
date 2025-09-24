import { DatabaseService } from "src/database/database.service";

import { Module } from "@nestjs/common";

import { CurrencyController } from "./currency.controller";
import { CurrencyScraper } from "./currency.scraper";
import { CurrencyService } from "./currency.service";

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, DatabaseService, CurrencyScraper],
  exports: [CurrencyService, CurrencyScraper],
})
export class CurrencyModule {}
