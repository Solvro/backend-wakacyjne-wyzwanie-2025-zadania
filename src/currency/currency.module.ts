import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";
import { TasksService } from "./tasks/tasks.service";

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, TasksService],
  imports: [PrismaModule],
  exports: [CurrencyService],
})
export class CurrencyModule {}
