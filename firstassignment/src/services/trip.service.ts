import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Trip, Prisma } from "../../generated/prisma";
import { CreateTripDto } from "src/Dto/create-trip-dto";

@Injectable()
export class TripsService{
    constructor(private prisma: PrismaService){}

    async trips(): Promise<Trip[]>{
        return this.prisma.trip.findMany({include: {participants: {include: {expenses: true}}}});
    }

    async createTrip(data: CreateTripDto): Promise<Trip>{
        return this.prisma.trip.create({
            data: {
                start_date: data.start_date,
                end_date: data.end_date,
                location: data.location,
                created_at: new Date(),
                updated_at: new Date(),
            },
        })
    }
    
    async updateTrip(parameters:{
        where: Prisma.TripWhereUniqueInput;
        data: Prisma.TripUpdateInput;
    }): Promise<Trip>{
        const { where, data } = parameters;
        return this.prisma.trip.update({
            data,
            where,
        })
    }

    async deleteTrip(id: number): Promise<Trip>{
        return this.prisma.trip.delete({where: {id},include:{ participants: {include: {expenses: true}}}})
    }
}