import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    await this.database.participant.create({
      data: {
        id: createParticipantDto.id,
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        sex: createParticipantDto.sex ?? null,
        age: createParticipantDto.age,
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
    return this.database.participant.update({
      where: { id },
      data: {
        id: updateParticipantDto.id,
        name: updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        sex: updateParticipantDto.sex ?? null,
        age: updateParticipantDto.age,
        email: updateParticipantDto.email,
      },
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({ where: { id } });
  }
}
