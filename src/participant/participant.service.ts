import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: {
        Name: createParticipantDto.Name,
        Email: createParticipantDto.Email,
        Date_of_birth: createParticipantDto.Date_of_birth,
        Trip_id: createParticipantDto.Trip_id,
      },
    });
  }

  async findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    return this.prisma.participant.findUnique({ where: { id } });
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
