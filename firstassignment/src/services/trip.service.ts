import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Trip } from "../../generated/prisma";
import { CreateTripDto } from "src/Dto/create-trip-dto";

@Injectable()
export class TripsService{
    constructor(private prisma: PrismaService){}

    async trip(id: number): Promise<Trip>{
        return this.prisma.trip.findFirstOrThrow({where: {id}, include: {participants: {include: {expenses: true}}}});
    }

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
        id: number;
        newData: CreateTripDto;
    }): Promise<Trip>{
        const { id, newData } = parameters;
        return this.prisma.trip.update({
            data: {
                start_date: newData.start_date,
                end_date: newData.end_date,
                location: newData.location,
                updated_at: new Date(),
            },
            where: {id},
        })
    }

    async deleteTrip(id: number): Promise<Trip>{
        return this.prisma.trip.delete({where: {id},include:{ participants: {include: {expenses: true}}}})
    }
}