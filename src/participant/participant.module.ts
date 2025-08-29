import { AuthService } from "src/auth/auth.service";
import { RoleGuard } from "src/auth/roles/role.guard";
import { UserService } from "src/user/user.service";

import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  imports: [PrismaModule],
  controllers: [ParticipantController],
  providers: [ParticipantService, RoleGuard, AuthService, UserService],
})
export class ParticipantModule {}
