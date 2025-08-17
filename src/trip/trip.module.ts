import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';

@Module({
  providers: [TripService],
  controllers: [TripController]
})
export class TripModule {}
