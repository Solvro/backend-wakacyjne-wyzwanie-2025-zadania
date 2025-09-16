import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  imports: [DatabaseModule, AuthModule],
})
export class ParticipantModule {}
