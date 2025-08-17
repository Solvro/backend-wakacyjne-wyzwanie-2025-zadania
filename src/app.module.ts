import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseService } from "./database/database.service";
import { TripController } from "./trip/trip.controller";
import { TripService } from "./trip/trip.service";

@Module({
  imports: [],
  controllers: [AppController, TripController],
  providers: [AppService, DatabaseService, TripService],
})
export class AppModule {}
