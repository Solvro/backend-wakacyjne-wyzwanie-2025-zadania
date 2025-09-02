import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [PrismaModule],
})
export class TripModule {}
