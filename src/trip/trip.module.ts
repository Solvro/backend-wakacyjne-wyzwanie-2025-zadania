import { AuthService } from "src/auth/auth.service";
import { DatabaseModule } from "src/database/database.module";
import { ParticipantService } from "src/participant/participant.service";

import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService, AuthService, ParticipantService],
  imports: [DatabaseModule],
})
export class TripModule {}
