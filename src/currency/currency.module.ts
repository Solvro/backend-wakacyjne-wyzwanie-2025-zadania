import { CurrencySchedulerService } from "src/currency-scheduler/currency-scheduler.service";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { CurrencyService } from "./currency.service";

@Module({
  imports: [DatabaseModule],
  providers: [CurrencyService, CurrencySchedulerService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
