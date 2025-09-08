import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return await this.prisma.participant.create({
      data: createParticipantDto,
    });
  }

  async findAll() {
    return await this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    try {
      return await this.prisma.participant.update({
        where: { id },
        data: updateParticipantDto,
      });
    } catch (error) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.participant.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
  }
}
