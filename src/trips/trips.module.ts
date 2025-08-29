import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  providers: [TripsService, PrismaService],
  controllers: [TripsController],
})
export class TripsModule {}
