import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { DatabaseModule } from "../database/database.module";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, AuthService],
  imports: [DatabaseModule],
  exports: [ParticipantService],
})
export class ParticipantModule {}
