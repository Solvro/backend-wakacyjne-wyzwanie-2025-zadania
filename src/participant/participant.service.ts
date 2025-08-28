import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { DEFAULT_PAGE_SIZE } from "./utils/constants";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        email: createParticipantDto.email,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return this.database.participant.findMany({
      skip: paginationDto.offset,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
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
        email: updateParticipantDto.email,
      },
    });
  }

  async remove(participant_id: number) {
    return this.database.participant.delete({ where: { participant_id } });
  }
}
