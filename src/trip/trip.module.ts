import { AuthModule } from "src/auth/auth.module";

import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [DatabaseModule, AuthModule],
})
export class TripModule {}
