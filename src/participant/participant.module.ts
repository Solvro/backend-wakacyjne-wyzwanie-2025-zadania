import { Module } from "@nestjs/common";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  providers: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
