import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/roles/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { UserService } from "../user/user.service";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  imports: [PrismaModule],
  controllers: [ParticipantController],
  providers: [ParticipantService, RoleGuard, AuthService, UserService],
})
export class ParticipantModule {}
