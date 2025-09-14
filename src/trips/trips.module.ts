import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { RoleGuard } from "../auth/role/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  providers: [TripsService, RoleGuard],
  controllers: [TripsController],
  imports: [AuthModule, PrismaModule],
})
export class TripsModule {}
