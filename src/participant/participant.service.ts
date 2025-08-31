import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({
      data: {
        first_name: createParticipantDto.firstName,
        last_name: createParticipantDto.lastName,
        email: createParticipantDto.email,
        phone: createParticipantDto.phone,
      },
    });
  }

  async findAll() {
    return this.databaseService.participant.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: id },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const existingParticipant =
      await this.databaseService.participant.findUnique({
        where: { participant_id: id },
      });

    if (existingParticipant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    return this.databaseService.participant.update({
      where: { participant_id: id },
      data: {
        first_name: updateParticipantDto.firstName,
        last_name: updateParticipantDto.lastName,
        email: updateParticipantDto.email,
        phone: updateParticipantDto.phone,
      },
    });
  }

  async remove(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: id },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    await this.databaseService.tripParticipants.deleteMany({
      where: { participant_id: id },
    });

    await this.databaseService.participant.delete({
      where: { participant_id: id },
    });

    return {
      message: `Participant with ID ${id.toString()} removed successfully`,
    };
  }
}
