import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { PrismaModule } from "../prisma/prisma.module";
import { ExchangeController } from "./exchange.controller";
import { ExchangeScheduler } from "./exchange.scheduler";
import { ExchangeScraper } from "./exchange.scraper";
import { ExchangeService } from "./exchange.service";

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [ExchangeController],
  providers: [ExchangeService, ExchangeScraper, ExchangeScheduler],
  exports: [ExchangeService, ExchangeScraper],
})
export class ExchangeModule {}
