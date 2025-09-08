import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  private async getParticipantOrThrow(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { participant_id: id },
    });

    if (participant == null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }
    return participant;
  }

  async create(createDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        first_name: createDto.first_name,
        last_name: createDto.last_name,
        role: createDto.role,
        email: createDto.email,
        trip_id: createDto.trip_id,
      },
      include: { trip: true },
    });
  }

  async findAll() {
    return this.database.participant.findMany({
      include: { trip: true },
      orderBy: { last_name: "asc" },
    });
  }

  async findOne(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { participant_id: id },
      include: { trip: true },
    });

    if (participant == null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    return participant;
  }

  async update(id: number, updateDto: UpdateParticipantDto) {
    await this.getParticipantOrThrow(id);

    const data: Prisma.ParticipantUpdateInput = {
      first_name: updateDto.first_name,
      last_name: updateDto.last_name,
      role: updateDto.role,
      ...(updateDto.email != null && {
        User: { connect: { email: updateDto.email } },
      }),
    };

    if (updateDto.trip_id != null) {
      data.trip = { connect: { trip_id: updateDto.trip_id } };
    }

    return this.database.participant.update({
      where: { participant_id: id },
      data,
      include: { trip: true },
    });
  }

  async remove(id: number): Promise<void> {
    await this.getParticipantOrThrow(id);
    await this.database.participant.delete({ where: { participant_id: id } });
  }
}
