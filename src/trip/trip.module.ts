import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [DatabaseModule, AuthModule],
})
export class TripModule {}
