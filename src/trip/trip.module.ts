import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  providers: [TripService, PrismaService],
  controllers: [TripController],
})
export class TripModule {}
