import { AuthModule } from "src/auth/auth.module";
import { RolesGuard } from "src/auth/roles.guard";

import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, RolesGuard],
  imports: [DatabaseModule, AuthModule],
})
export class ParticipantModule {}
