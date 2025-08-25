import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Participant, Prisma } from "../../generated/prisma";

@Injectable()
export class ParticipantsService{
    constructor(private prisma: PrismaService){}

    async participants(): Promise<Participant[]>{
        return this.prisma.participant.findMany();
    }

    async createParticipant(data: Prisma.ParticipantCreateInput): Promise<Participant>{
        return this.prisma.participant.create({
            data,
        })
    }
    
    async updateParticipant(parameters:{
        where: Prisma.ParticipantWhereUniqueInput;
        data: Prisma.ParticipantUpdateInput;
    }): Promise<Participant>{
        const { where, data } = parameters;
        return this.prisma.participant.update({
            data,
            where,
        })
    }

    async deleteParticipant(where: Prisma.ParticipantWhereUniqueInput): Promise<Participant>{
        return this.prisma.participant.delete({
            where,
        })
    }
}