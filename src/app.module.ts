import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CurrencyModule } from "./currency/currency.module";
import { DatabaseModule } from "./database/database.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { TripModule } from "./trip/trip.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    TripModule,
    ExpenseModule,
    ParticipantModule,
    UserModule,
    AuthModule,
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
