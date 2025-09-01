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
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        account_type: createParticipantDto.account_type,
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
        name: updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        account_type: updateParticipantDto.account_type,
      },
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({ where: { id } });
  }
}
