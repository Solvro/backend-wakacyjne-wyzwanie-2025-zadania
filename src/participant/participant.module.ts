import { AuthService } from "src/auth/auth.service";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, AuthService],
  exports: [ParticipantService],
  imports: [DatabaseModule],
})
export class ParticipantModule {}
