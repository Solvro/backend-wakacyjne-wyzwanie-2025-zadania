import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { TripParticipantsController } from "./trip-participants.controller";
import { TripParticipantsService } from "./trip-participants.service";

@Module({
  controllers: [TripParticipantsController],
  providers: [TripParticipantsService],
  imports: [DatabaseModule],
})
export class TripParticipantsModule {}
