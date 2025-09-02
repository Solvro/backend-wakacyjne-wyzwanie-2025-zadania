import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: {
        first_name: createDto.first_name,
        last_name: createDto.last_name,
        role: createDto.role,
        email: createDto.email,
        trip: { connect: { trip_id: createDto.trip_id } },
      },
      include: { trip: true },
    });
  }

  findAll() {
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

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }

  async update(id: number, updateDto: UpdateParticipantDto) {
    const participant = await this.database.participant.findUnique({
      where: { participant_id: id },
    });
    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    const data: any = {
      first_name: updateDto.first_name,
      last_name: updateDto.last_name,
      role: updateDto.role,
      email: updateDto.email,
    };

    if (updateDto.trip_id !== undefined) {
      data.trip = { connect: { trip_id: updateDto.trip_id } };
    }

    return this.database.participant.update({
      where: { participant_id: id },
      data,
      include: { trip: true },
    });
  }

  async remove(id: number) {
    const exists = await this.database.participant.findUnique({
      where: { participant_id: id },
    });
    if (!exists) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    await this.database.participant.delete({ where: { participant_id: id } });
    return { message: `Participant with ID ${id} deleted successfully` };
  }
}
