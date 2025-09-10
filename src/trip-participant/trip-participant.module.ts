import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { TripParticipantController } from "./trip-participant.controller";
import { TripParticipantService } from "./trip-participant.service";

@Module({
  controllers: [TripParticipantController],
  providers: [TripParticipantService],
  imports: [DatabaseModule],
})
export class TripParticipantModule {}
