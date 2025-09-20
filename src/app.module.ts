import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AuthModule } from "./auth/auth.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ForexModule } from "./forex/forex.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PrismaService } from "./prisma/prisma.service";
import { TripsModule } from "./trips/trips.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TripsModule,
    ParticipantsModule,
    ExpensesModule,
    AuthModule,
    UserModule,
    ForexModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
