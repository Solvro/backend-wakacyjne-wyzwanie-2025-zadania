import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { DatabaseModule } from "./database/database.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { PaymentsController } from "./payments/payments.controller";
import { PaymentsModule } from "./payments/payments.module";
import { PaymentsService } from "./payments/payments.service";
import { TripParticipantsModule } from "./trip-participants/trip-participants.module";
import { TripModule } from "./trip/trip.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    DatabaseModule,
    TripModule,
    ExpenseModule,
    ParticipantModule,
    TripParticipantsModule,
    AuthModule,
    UsersModule,
    CurrenciesModule,
    ScheduleModule.forRoot(),
    PaymentsModule,
  ],
  controllers: [AppController, PaymentsController],
  providers: [AppService, PaymentsService],
})
export class AppModule {}
