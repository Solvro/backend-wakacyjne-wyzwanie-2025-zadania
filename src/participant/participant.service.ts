import { Participant } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { PaginationDto } from "src/pagination/pagination.dto";
import { DEFAULT_PAGE_SIZE } from "src/pagination/utils/constants";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import {
  ParticipantMetadata,
  participantToMetadata,
} from "./dto/participant-metadata.dto";
import { ParticipantUpdateResponseDto } from "./dto/participant-update-response.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        email: createParticipantDto.email,
        password: createParticipantDto.password,
        role: "Participant",
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return this.database.participant.findMany({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(participant_id: number) {
    return this.database.participant.findUnique({ where: { participant_id } });
  }

  async findOneByEmail(email: string) {
    return this.database.participant.findUnique({ where: { email } });
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

  async findMetadataOrFail(email: string): Promise<ParticipantMetadata> {
    return participantToMetadata(await this.findByIdOrFail(email));
  }

  private async findByIdOrFail(email: string): Promise<Participant> {
    const found = await this.database.participant.findUnique({
      where: { email },
    });
    if (found === null) {
      throw new NotFoundException("User not found");
    }
    return found;
  }

  async updateParticipantData(
    email: string,
    newName: string | null | undefined,
  ): Promise<ParticipantUpdateResponseDto> {
    const participant = await this.findByIdOrFail(email);
    participant.name = newName ?? participant.name;
    return await this.mergeParticipant(participant);
  }

  private async mergeParticipant(
    participant: Participant,
  ): Promise<Participant> {
    return await this.database.participant.update({
      where: { email: participant.email },
      data: {
        ...participant,
      },
    });
  }
}
