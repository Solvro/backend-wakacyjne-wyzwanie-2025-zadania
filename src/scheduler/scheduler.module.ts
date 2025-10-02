import { DatabaseModule } from "src/database/database.module";
import { ScraperService } from "src/scraper/scraper.service";

import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { SchedulerService } from "./scheduler.service";

@Module({
  providers: [SchedulerService, ScraperService],
  imports: [ScheduleModule.forRoot(), DatabaseModule],
})
export class SchedulerModule {}
