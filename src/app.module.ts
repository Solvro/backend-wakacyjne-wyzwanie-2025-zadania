import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaModule } from "../prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CurrencyModule } from "./currency/currency.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PaymentsModule } from "./payments/payments.module";
import { TripsModule } from "./trips/trips.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ParticipantsModule,
    ExpensesModule,
    AuthModule,
    UsersModule,
    CurrencyModule,
    PaymentsModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
