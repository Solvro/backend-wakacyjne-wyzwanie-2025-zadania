import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { CurrenciesController } from "./currencies.controller";
import { CurrenciesService } from "./currencies.service";
import { CurrencyScraperService } from "./currency-scraper.service";

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, CurrencyScraperService],
  imports: [DatabaseModule],
})
export class CurrenciesModule {}
