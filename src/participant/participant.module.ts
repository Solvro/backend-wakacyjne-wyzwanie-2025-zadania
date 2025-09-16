import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
