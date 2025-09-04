import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { RoleGuard } from "../auth/role/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

@Module({
  providers: [ParticipantsService, RoleGuard],
  controllers: [ParticipantsController],
  imports: [AuthModule, PrismaModule],
})
export class ParticipantsModule {}
