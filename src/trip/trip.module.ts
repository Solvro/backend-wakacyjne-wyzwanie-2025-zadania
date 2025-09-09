import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [DatabaseModule, AuthModule],
})
export class TripModule {}
