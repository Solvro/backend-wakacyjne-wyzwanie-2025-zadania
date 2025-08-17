import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Trip, Prisma } from '@prisma/client'

@Injectable()
export class TripService {
    constructor(private prisma: DatabaseService) {}

    async all(): Promise<Trip[]> {
        return this.prisma.trip.findMany();
    }

    async createTrip(data: Prisma.TripCreateInput): Promise<Trip> {
        return this.prisma.trip.create({data});
    }
}
