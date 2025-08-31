import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { TripParticipantsModule } from "./trip-participants/trip-participants.module";
import { TripModule } from "./trip/trip.module";

@Module({
  imports: [
    DatabaseModule,
    TripModule,
    ExpenseModule,
    ParticipantModule,
    TripParticipantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
