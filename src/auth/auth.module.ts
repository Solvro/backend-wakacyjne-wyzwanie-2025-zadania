import { DatabaseModule } from "src/database/database.module";
import { ParticipantModule } from "src/participant/participant.module";

import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [DatabaseModule, ParticipantModule],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
