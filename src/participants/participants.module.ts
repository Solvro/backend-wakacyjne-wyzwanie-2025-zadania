import { AuthModule } from "src/auth/auth.module";
import { RoleGuard } from "src/auth/role/role.guard";
import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

@Module({
  providers: [ParticipantsService, RoleGuard],
  controllers: [ParticipantsController],
  imports: [AuthModule, PrismaModule],
})
export class ParticipantsModule {}
