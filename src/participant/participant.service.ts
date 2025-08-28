import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

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
        email: createParticipantDto.email,
      },
    });
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

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    if (
      (await this.database.participant.findUnique({ where: { id } })) === null
    ) {
      throw new NotFoundException(
        `Not found participant with ID: ${id.toString()}`,
      );
    }

    return this.database.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        email: updateParticipantDto.email,
      },
    });
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

  async checkEmail(email: string) {
    if (
      (await this.database.participant.findUnique({
        where: { email },
      })) !== null
    ) {
      throw new ConflictException(
        "Participant with this e-mail address already exists!",
      );
    }
  }
}
