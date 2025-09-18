import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { CurrencyScraperService } from "./currency-scraper.service";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyScraperService],
  imports: [DatabaseModule, AuthModule],
})
export class CurrencyModule {}
