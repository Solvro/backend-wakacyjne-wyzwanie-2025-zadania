import { AuthModule } from "src/auth/auth.module";

import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  imports: [DatabaseModule, AuthModule],
})
export class ParticipantModule {}
