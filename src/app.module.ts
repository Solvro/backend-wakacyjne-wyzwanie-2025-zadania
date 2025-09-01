import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { TripModule } from './trip/trip.module';

@Module({
  imports: [DatabaseModule, TripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
