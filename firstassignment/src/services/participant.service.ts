import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Participant } from "../../generated/prisma";
import { CreateParticipantDto } from "src/Dto/create-participant-dto";
import { TripsService } from "./trip.service";

@Injectable()
export class ParticipantsService{
    constructor(private prisma: PrismaService, private tripService: TripsService){}

    async participant(id: number): Promise<Participant>{
        return this.prisma.participant.findFirstOrThrow({where: {id},include: {expenses: true}});
    }

    async participants(): Promise<Participant[]>{
        return this.prisma.participant.findMany();
    }

    async createParticipant(data: CreateParticipantDto): Promise<void> {
        await this.tripService.trip(data.tripId)
        .catch((error: unknown) => {console.error(error)})
        .finally(async () => {
            return this.prisma.participant.create({
                data:{
                    imie: data.imie,
                    nazwisko: data.nazwisko,
                    gender: data.gender,
                    isVegan: data.isVegan,
                    tripId: data.tripId,
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            })
        });
    }
    
    async updateParticipant(parameters:{
            id: number;
            newData: CreateParticipantDto;
    }): Promise<Participant>{
        const { id, newData } = parameters;
        return this.prisma.participant.update({
            data: {
                imie: newData.imie,
                nazwisko: newData.nazwisko,
                gender: newData.gender,
                isVegan: newData.isVegan,
                tripId: newData.tripId,
                updated_at: new Date(),
            },
            where: {id},
        })
    }

    async deleteParticipant(id: number): Promise<Participant>{
        return this.prisma.participant.delete({where: {id}, include: {expenses: true}})
    }
}