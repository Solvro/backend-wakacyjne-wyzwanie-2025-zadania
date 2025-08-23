import { Module } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  providers: [DatabaseService, ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
