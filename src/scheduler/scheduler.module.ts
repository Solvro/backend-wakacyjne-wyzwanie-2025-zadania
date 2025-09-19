import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { CurrencyModule } from "../currency/currency.module";
import { ScrapperModule } from "../scrapper/scrapper.module";
import { SchedulerService } from "./scheduler.service";

@Module({
  providers: [SchedulerService],
  imports: [
    ScheduleModule.forRoot(), // ✅ TO JEST KLUCZOWE!
    ScrapperModule,
    CurrencyModule,
  ],
  exports: [SchedulerService],
})
export class SchedulerModule {}
