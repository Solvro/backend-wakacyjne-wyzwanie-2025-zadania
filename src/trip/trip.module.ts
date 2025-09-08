import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  imports: [PrismaModule],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
