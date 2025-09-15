import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CurrencyModule } from "./currency/currency.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { PaymentsModule } from "./payments/payments.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TripModule } from "./trip/trip.module";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    PrismaModule,
    TripModule,
    ParticipantModule,
    ExpenseModule,
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
    CurrencyModule,
    PaymentsModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
