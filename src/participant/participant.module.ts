import { DatabaseService } from "src/database/database.service";

import { Module } from "@nestjs/common";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  providers: [DatabaseService, ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
