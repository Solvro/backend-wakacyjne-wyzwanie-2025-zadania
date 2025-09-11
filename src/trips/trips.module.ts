import { Module } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { TripAccessService } from "./trip-access.service";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  providers: [PrismaService, TripAccessService, TripsService],
  controllers: [TripsController],
  exports: [TripAccessService],
})
export class TripsModule {}
