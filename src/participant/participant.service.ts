import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        birthday: createParticipantDto.birthday,
        email: createParticipantDto.email,
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(participant_id: number) {
    return this.database.participant.findUnique({ where: { participant_id } });
  }

  async update(
    participant_id: number,
    updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.database.participant.update({
      where: { participant_id },
      data: {
        name: updateParticipantDto.name,
        birthday: updateParticipantDto.birthday,
        email: updateParticipantDto.email,
      },
    });
  }

  async remove(participant_id: number) {
    return this.database.participant.delete({ where: { participant_id } });
  }
}
