import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        lastName: createParticipantDto.lastName,
        email: createParticipantDto.email,
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({ where: { id } });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const currentEntry = await this.database.participant.findUnique({
      where: { id },
    });
    if (currentEntry === null) {
      throw new NotFoundException(
        `Participant with an Id of ${id.toString()} does not exist`,
      );
    }

    return this.database.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        lastName: updateParticipantDto.lastName,
        email: updateParticipantDto.email,
      },
    });
  }

  async remove(id: number) {
    const currentEntry = await this.database.participant.findUnique({
      where: { id },
    });
    if (currentEntry === null) {
      throw new NotFoundException(
        `Participant with an Id of ${id.toString()} already does not exist`,
      );
    }

    return this.database.participant.delete({ where: { id } });
  }
}
