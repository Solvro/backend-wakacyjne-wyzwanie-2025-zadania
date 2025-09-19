import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CurrencyModule } from "./currency/currency.module";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/database.service";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { PaymentModule } from "./payment/payment.module";
import { TripController } from "./trip/trip.controller";
import { TripModule } from "./trip/trip.module";

@Module({
  imports: [
    ParticipantModule,
    ExpenseModule,
    TripModule,
    AuthModule,
    DatabaseModule,
    CurrencyModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PaymentModule,
  ],
  controllers: [AppController, TripController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
