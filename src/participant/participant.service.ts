import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        firstName: createParticipantDto.firstName,
        lastName: createParticipantDto.lastName,
        address: createParticipantDto.address,
        phoneNumber: createParticipantDto.phoneNumber,
        sex: createParticipantDto.sex,
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({
      where: { participantId: id },
    });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.database.participant.update({
      where: { participantId: id },
      data: {
        firstName: updateParticipantDto.firstName,
        lastName: updateParticipantDto.lastName,
        address: updateParticipantDto.address,
        phoneNumber: updateParticipantDto.phoneNumber,
        sex: updateParticipantDto.sex,
      },
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({ where: { participantId: id } });
  }
}
