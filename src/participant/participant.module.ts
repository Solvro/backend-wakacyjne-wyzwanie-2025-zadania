import { Module } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  imports: [DatabaseService],
})
export class ParticipantModule {}
