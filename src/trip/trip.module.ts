import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [DatabaseModule, AuthModule],
})
export class TripModule {}
