import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseService } from "./database/database.service";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { RegisterModule } from "./register/register.module";
import { TripController } from "./trip/trip.controller";
import { TripModule } from "./trip/trip.module";
import { TripService } from "./trip/trip.service";

@Module({
  imports: [
    ParticipantModule,
    ExpenseModule,
    TripModule,
    RegisterModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, TripController],
  providers: [AppService, DatabaseService, TripService],
})
export class AppModule {}
