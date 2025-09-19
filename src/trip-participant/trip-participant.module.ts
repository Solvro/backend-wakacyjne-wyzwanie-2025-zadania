import { AuthModule } from "src/auth/auth.module";
import { RolesGuard } from "src/auth/roles.guard";

import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { TripParticipantController } from "./trip-participant.controller";
import { TripParticipantService } from "./trip-participant.service";

@Module({
  controllers: [TripParticipantController],
  providers: [TripParticipantService, RolesGuard],
  imports: [DatabaseModule, AuthModule],
})
export class TripParticipantModule {}
