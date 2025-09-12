import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: {
        name: createParticipantDto.name,
        email: createParticipantDto.email,
        trip_id: createParticipantDto.trip_id,
      },
    });
  }

  async findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
    });
    if (participant === null) {
      throw new NotFoundException(`participant with id not found`);
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    return this.prisma.participant.delete({ where: { id } });
  }
}
