import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return "This action adds a new participant";
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { id },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Not found participant with ID: ${id.toString()}`,
      );
    }

    return participant;
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant`;
  }

  async remove(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { id },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Not found participant with ID: ${id.toString()}`,
      );
    }

    return this.database.participant.delete({ where: { id } });
  }
}
