import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { TripsService } from "../trips/trips.service";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, TripsService, PrismaService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
