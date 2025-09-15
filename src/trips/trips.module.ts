import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
