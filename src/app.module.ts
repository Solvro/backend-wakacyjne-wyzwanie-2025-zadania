import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseController } from "./database/database.controller";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/database.service";
import { ExpenseController } from "./expense/expense.controller";
import { ExpenseModule } from "./expense/expense.module";
import { ExpenseService } from "./expense/expense.service";
import { ParticipantController } from "./participant/participant.controller";
import { ParticipantModule } from "./participant/participant.module";
import { ParticipantService } from "./participant/participant.service";
import { TripController } from "./trip/trip.controller";
import { TripModule } from "./trip/trip.module";
import { TripService } from "./trip/trip.service";

@Module({
  imports: [DatabaseModule, ParticipantModule, TripModule, ExpenseModule],
  controllers: [
    AppController,
    DatabaseController,
    ExpenseController,
    TripController,
    ParticipantController,
  ],
  providers: [
    AppService,
    DatabaseService,
    ExpenseService,
    ParticipantService,
    TripService,
  ],
})
export class AppModule {}
