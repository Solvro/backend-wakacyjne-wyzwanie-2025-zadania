import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  providers: [TripService],
  controllers: [TripController],
})
export class TripModule {}
