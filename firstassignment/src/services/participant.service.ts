import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Participant } from "../../generated/prisma";
import { CreateParticipantDto } from "../Dto/create-participant-dto";
import { TripsService } from "./trip.service";
import { UpdateParticipantDto } from "../Dto/update-participant-dto";

@Injectable()
export class ParticipantsService{
    constructor(private prisma: PrismaService, private tripService: TripsService){}

    async participantById(id: number){
        return this.prisma.participant.findUnique({where: {id}});
    }

    async allParticipants(): Promise<Participant[]>{
        return this.prisma.participant.findMany();
    }

    async createParticipant(data: CreateParticipantDto){
        const trip = await this.tripService.tripById(data.tripId);
        if(trip === null){
            throw new NotFoundException(`Wyacieczka z ID ${data.tripId.toString()} nie istnieje`);
        }else{
            return this.prisma.participant.create({
                data
            })
        }
    }
    
    async updateParticipant(parameters:{
            id: number;
            newData: UpdateParticipantDto;
    }){
        const { id, newData } = parameters;
        const participant = await this.participantById(id);
        if(newData.tripId !== undefined){
            const trip = await this.tripService.tripById(newData.tripId);
            if(trip === null){
                throw new NotFoundException(`Wycieczka z ID ${newData.tripId.toString()} nie istnieje`)
            }
        }
        if(participant === null){
            throw new NotFoundException(`Uczestnik z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.participant.update({
            data: newData,
            where: {id},
        })
        }
    }

    async deleteParticipant(id: number){
        const participant = await this.participantById(id);
        if(participant === null){
            throw new NotFoundException(`Uczestnik z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.participant.delete({where: {id}})
        }
    }
}