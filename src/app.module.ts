import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
