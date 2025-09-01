import { DatabaseModule } from 'src/database/database.module';

import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [DatabaseModule],
})
export class TripModule {}
