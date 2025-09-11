import { Participant } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateParticipantDto): Promise<Participant> {
    const { tripId, ...rest } = dto;
    return this.prisma.participant.create({
      data: {
        ...rest,
        trip: { connect: { id: tripId } },
      },
    });
  }

  async findAll(): Promise<Participant[]> {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
    });
    if (participant == null) {
      throw new NotFoundException(
        `Participant with ID ${String(id)} hasn't been found`,
      );
    }
    return participant;
  }

  async update(id: number, dto: UpdateParticipantDto): Promise<Participant> {
    await this.findOne(id);

    const { tripId, ...rest } = dto as UpdateParticipantDto & {
      tripId?: number;
    };

    return this.prisma.participant.update({
      where: { id },
      data:
        tripId == null
          ? { ...rest }
          : {
              ...rest,
              trip: { connect: { id: tripId } },
            },
    });
  }

  async remove(id: number): Promise<Participant> {
    await this.findOne(id);
    return this.prisma.participant.delete({ where: { id } });
  }
}
