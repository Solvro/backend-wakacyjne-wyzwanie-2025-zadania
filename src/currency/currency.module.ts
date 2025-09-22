import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";
import { RateScraperService } from "./rate-scraper.service";
import { RatesScheduler } from "./rates-scheduler.service";

@Module({
  imports: [PrismaModule],
  controllers: [CurrencyController],
  providers: [CurrencyService, RateScraperService, RatesScheduler],
  exports: [CurrencyService],
})
export class CurrencyModule {}
