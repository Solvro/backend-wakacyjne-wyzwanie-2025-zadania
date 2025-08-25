import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({ data: createParticipantDto });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({ where: { id_p: id } });
  }

  async update(id: number, data: UpdateParticipantDto) {
    return this.database.participant.update({
      where: { id_p: id },
      data,
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({
      where: { id_p: id },
    });
  }
}
