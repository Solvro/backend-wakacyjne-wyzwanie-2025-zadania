import { Controller, Get, Post, Body } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Trip } from '@prisma/client';


@Controller("database")  
export class DatabaseController {
    constructor(private prisma: DatabaseService) {}

    @Get('/Trip')
    async getTrips(): Promise<Trip[]> {
        return await this.prisma.trip.findMany();
    }

    @Post('/Trip')
    async createTrip(@Body() tripData: Partial<Trip>): Promise<Trip> {
        return await this.prisma.trip.create({
            data: tripData,
        });
    }
}
