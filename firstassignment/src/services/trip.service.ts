import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Trip } from "../../generated/prisma";
import { CreateTripDto } from "../Dto/create-trip-dto";
import { UpdateTripDto } from "../Dto/update-trip-dto";

@Injectable()
export class TripsService{
    constructor(private prisma: PrismaService){}

    async tripById(id: number){
        return this.prisma.trip.findUnique({where: {id}});
    }

    async allTrips(): Promise<Trip[]>{
        return this.prisma.trip.findMany();
    }

    async createTrip(data: CreateTripDto): Promise<Trip>{
        return this.prisma.trip.create({
            data,
        })
    }
    
    async updateTrip(parameters:{
        id: number;
        newData: UpdateTripDto;
    }){
        const { id, newData } = parameters;
        const trip = await this.tripById(id);
        if(trip === null){
            throw new NotFoundException(`Wycieczka z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.trip.update({
                where: {id},
                data: newData,
            })
        }
    }

    async deleteTrip(id: number): Promise<Trip>{
        const trip = await this.tripById(id);
        if(trip === null){
            throw new NotFoundException(`Wycieczka z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.trip.delete({where: {id}})
        }
    }
}