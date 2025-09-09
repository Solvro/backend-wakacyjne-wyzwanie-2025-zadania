import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        age: createParticipantDto.age,
        tripId: createParticipantDto.tripId,
        gender: createParticipantDto.gender,
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    const participant: unknown = this.database.participant.findUnique({
      where: { id },
    });
    if (participant == null) {
      throw new NotFoundException("Participant not found");
    } else {
      return participant;
    }
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const participant: unknown = this.database.participant.findUnique({
      where: { id },
    });
    if (participant == null) {
      throw new NotFoundException("Participant not found");
    } else {
      return this.database.participant.update({
        where: { id },
        data: {
          name: updateParticipantDto.name,
          surname: updateParticipantDto.surname,
          age: updateParticipantDto.age,
          tripId: updateParticipantDto.tripId,
          gender: updateParticipantDto.gender,
        },
      });
    }
  }

  async remove(id: number) {
    const participant: unknown = this.database.participant.findUnique({
      where: { id },
    });
    if (participant == null) {
      throw new NotFoundException("Participant not found");
    } else {
      return this.database.participant.delete({ where: { id } });
    }
  }
}
