import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  imports: [DatabaseModule],
  providers: [TripService],
  controllers: [TripController],
  exports: [TripService],
})
export class TripModule {}
