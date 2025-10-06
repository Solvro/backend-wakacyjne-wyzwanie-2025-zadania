import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async findOneOrFail(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { id },
    });
    if (participant === null) {
      throw new NotFoundException("Participant not found");
    }
    return participant;
  }

  async tripIdCheck(id: number) {
    const expense = await this.database.trip.findUnique({
      where: { id },
    });
    if (expense == null) {
      throw new NotFoundException("TripId not found");
    }
  }

  async create(createParticipantDto: CreateParticipantDto) {
    await this.tripIdCheck(createParticipantDto.tripId);
    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        age: createParticipantDto.age,
        tripId: createParticipantDto.tripId,
        gender: createParticipantDto.gender,
        userEmail: createParticipantDto.userEmail,
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    return await this.findOneOrFail(id);
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOneOrFail(id);
    if (typeof updateParticipantDto.tripId != "undefined") {
      await this.tripIdCheck(updateParticipantDto.tripId);
    }
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

  async remove(id: number) {
    await this.findOneOrFail(id);
    return this.database.participant.delete({ where: { id } });
  }
}
