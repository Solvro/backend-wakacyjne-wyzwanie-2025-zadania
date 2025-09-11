import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [DatabaseModule],
})
export class TripModule {}
