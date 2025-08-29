import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PrismaService } from "./prisma/prisma.service";
import { TripsModule } from "./trips/trips.module";

@Module({
  imports: [TripsModule, ParticipantsModule, ExpensesModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
