import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { CurrencyExchangeController } from "./currency-exchange.controller";
import { CurrencyExchangeScheduler } from "./currency-exchange.scheduler";
import { CurrencyExchangeScrapper } from "./currency-exchange.scraper";
import { CurrencyExchangeService } from "./currency-exchange.service";

@Module({
  controllers: [CurrencyExchangeController],
  providers: [
    CurrencyExchangeService,
    CurrencyExchangeScrapper,
    CurrencyExchangeScheduler,
  ],
  imports: [DatabaseModule, ScheduleModule.forRoot()],
})
export class CurrencyExchangeModule {}
