import { Module } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [DatabaseService],
})
export class TripModule {}
