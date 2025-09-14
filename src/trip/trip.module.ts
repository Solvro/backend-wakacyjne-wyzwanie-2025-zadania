import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { DatabaseModule } from "../database/database.module";
import { ParticipantService } from "../participant/participant.service";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService, AuthService, ParticipantService],
  imports: [DatabaseModule],
})
export class TripModule {}
