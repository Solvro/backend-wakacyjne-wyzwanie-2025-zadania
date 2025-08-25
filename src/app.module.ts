import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ExpensesController } from "./expense/expense.controller";
import { ParticipantsController } from "./participant/participant.controller";
import { TripsController } from "./trip/trip.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    ExpensesController,
    TripsController,
    ParticipantsController,
  ],
  providers: [AppService],
})
export class AppModule {}
