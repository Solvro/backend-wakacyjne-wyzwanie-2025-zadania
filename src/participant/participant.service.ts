import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        trip_id: createParticipantDto.trip_id,
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        email: createParticipantDto.email,
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.database.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({
      where: { id },
    });
  }
}
