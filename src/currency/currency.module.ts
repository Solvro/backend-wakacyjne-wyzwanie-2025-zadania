import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { PrismaService } from "../../prisma/prisma.service";
import { CurrencyScheduler } from "./currency.scheduler";
import { CurrencyService } from "./currency.service";
import { Waluty24Scraper } from "./scrapper/waluty24";
import { CURRENCY_SCRAPER } from "./tokens";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    PrismaService,
    CurrencyService,
    CurrencyScheduler,
    { provide: CURRENCY_SCRAPER, useFactory: () => new Waluty24Scraper() },
  ],
  exports: [CurrencyService],
})
export class CurrencyModule {}
