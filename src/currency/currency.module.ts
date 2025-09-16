import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";
import { TasksService } from "./tasks/tasks.service";

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, TasksService],
  imports: [PrismaModule],
  exports: [CurrencyService, TasksService],
})
export class CurrencyModule {}
