import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Trip } from "../../generated/prisma";
import { CreateTripDto } from "src/Dto/create-trip-dto";
import { UpdateTripDto } from "src/Dto/update-tip-dto";

@Injectable()
export class TripsService{
    constructor(private prisma: PrismaService){}

    async tripById(id: number){
        return this.prisma.trip.findUnique({where: {id}});
    }

    async allTrips(): Promise<Trip[]>{
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
        newData: UpdateTripDto;
    }){
        const { id, newData } = parameters;
        const trip = await this.tripById(id);
        if(trip === null){
            throw new NotFoundException(`Wyacieczka z ID ${id.toString()} nie istnieje`);
        }
        else{
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
    }

    async deleteTrip(id: number): Promise<Trip>{
        const trip = await this.tripById(id);
        if(trip === null){
            throw new NotFoundException(`Wyacieczka z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.trip.delete({where: {id},include:{ participants: {include: {expenses: true}}}})
        }
    }
}