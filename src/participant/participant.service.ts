import { Participant, Role } from "@prisma/client";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { PaginationDto } from "../pagination/pagination.dto";
import { DEFAULT_PAGE_SIZE } from "../pagination/utils/constants";
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
    if (
      !createParticipantDto.email ||
      !createParticipantDto.name ||
      !createParticipantDto.password
    ) {
      throw new BadRequestException("Brak wymaganych danych");
    }
    return this.database.participant.create({
      data: {
        name: createParticipantDto.name,
        email: createParticipantDto.email,
        password: createParticipantDto.password,
        role: Role.Participant,
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
    const record = await this.database.participant.findUnique({
      where: { participant_id },
    });
    if (record == null) {
      throw new NotFoundException();
    }
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
    const record = await this.database.participant.findUnique({
      where: { participant_id },
    });
    if (record == null) {
      throw new NotFoundException("No record with this id");
    }
    await this.database.tripParticipant.deleteMany({
      where: { participant_id },
    });
    await this.database.expense.deleteMany({ where: { participant_id } });
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
