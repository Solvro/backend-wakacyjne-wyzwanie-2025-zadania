import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { ExpensesService } from "../expenses/expenses.service";
import { ParticipantsService } from "../participants/participants.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  controllers: [TripsController],
  providers: [
    TripsService,
    ParticipantsService,
    ExpensesService,
    PrismaService,
    AuthService,
    UserService,
  ],
})
export class TripsModule {}
