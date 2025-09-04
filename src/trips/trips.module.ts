import { AuthModule } from "src/auth/auth.module";
import { RoleGuard } from "src/auth/role/role.guard";
import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  providers: [TripsService, RoleGuard],
  controllers: [TripsController],
  imports: [AuthModule, PrismaModule],
})
export class TripsModule {}
