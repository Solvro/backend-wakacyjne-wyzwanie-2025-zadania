import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PaymentsModule } from "./payments/payments.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TripsModule } from "./trips/trips.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    TripsModule,
    ParticipantsModule,
    ExpensesModule,
    AuthModule,
    UsersModule,
    CurrenciesModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
