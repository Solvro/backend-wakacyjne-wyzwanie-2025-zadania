import { ParticipantModule } from "src/participant/participant.module";

import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ParticipantModule],
})
export class AuthModule {}
