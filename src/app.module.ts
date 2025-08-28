import { Module } from "@nestjs/common";

import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PrismaService } from "./prisma/prisma.service";
import { TripsModule } from "./trips/trips.module";

@Module({
  imports: [TripsModule, ParticipantsModule, ExpensesModule],
  providers: [PrismaService],
})
export class AppModule {}
