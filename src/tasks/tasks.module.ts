import { Module } from "@nestjs/common";

import { CurrencyService } from "../currency/currency.service";
import { DatabaseModule } from "../database/database.module";
import { CurrencyScraperService } from "./currency-scraper.service";

@Module({
  imports: [DatabaseModule],
  providers: [CurrencyScraperService, CurrencyService],
})
export class TasksModule {}
