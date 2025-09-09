import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { TripsService } from "../trips/trips.service";
import { UserService } from "../user/user.service";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

@Module({
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    TripsService,
    PrismaService,
    AuthService,
    UserService,
  ],
  exports: [ExpensesService],
})
export class ExpensesModule {}
