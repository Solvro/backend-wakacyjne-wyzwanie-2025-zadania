import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AuthModule } from "./auth/auth.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ForexModule } from "./forex/forex.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PaymentsModule } from "./payments/payments.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TripsModule } from "./trips/trips.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    TripsModule,
    ParticipantsModule,
    ExpensesModule,
    AuthModule,
    UserModule,
    ForexModule,
    PaymentsModule,
  ],
})
export class AppModule {}
