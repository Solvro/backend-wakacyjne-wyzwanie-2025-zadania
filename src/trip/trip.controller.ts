import { Controller, Body, Post, Get } from '@nestjs/common';
import { TripService } from '../trip/trip.service';
import { Prisma, Trip} from '@prisma/client';

@Controller('wycieczki')
export class TripController {
    constructor(private tripService: TripService) {}

    @Post('create') 
    async addTrip(
        @Body() data: Prisma.TripCreateInput): Promise<Trip> {
        return this.tripService.createTrip(data);
    }

    @Get('all')
    async findAll(): Promise<Trip[]> {
        return this.tripService.all();
    }
}