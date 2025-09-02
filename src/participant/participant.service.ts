import { Participant, Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createDto: CreateParticipantDto) {
    type ParticipantWithTrip = Prisma.ParticipantGetPayload<{
      include: { trip: true };
    }>;

    const created: ParticipantWithTrip = await this.database.participant.create(
      {
        data: {
          first_name: createDto.first_name,
          last_name: createDto.last_name,
          role: createDto.role,
          email: createDto.email,
          trip: { connect: { trip_id: createDto.trip_id } },
        },
        include: { trip: true },
      },
    );

    return created;
  }

  async findAll() {
    type ParticipantWithTrip = Prisma.ParticipantGetPayload<{
      include: { trip: true };
    }>;

    const participants: ParticipantWithTrip[] =
      await this.database.participant.findMany({
        include: { trip: true },
        orderBy: { last_name: "asc" },
      });

    return participants;
  }

  async findOne(id: number) {
    type ParticipantWithTrip = Prisma.ParticipantGetPayload<{
      include: { trip: true };
    }>;

    const participant: ParticipantWithTrip | null =
      await this.database.participant.findUnique({
        where: { participant_id: id },
        include: { trip: true },
      });

    if (participant == null) {
      throw new NotFoundException(
        `Participant with ID ${String(id)} not found`,
      );
    }

    return participant;
  }

  async update(id: number, updateDto: UpdateParticipantDto) {
    const participant: Participant | null =
      await this.database.participant.findUnique({
        where: { participant_id: id },
      });

    if (participant == null) {
      throw new NotFoundException(
        `Participant with ID ${String(id)} not found`,
      );
    }

    const data: Prisma.ParticipantUpdateInput = {
      first_name: updateDto.first_name,
      last_name: updateDto.last_name,
      role: updateDto.role,
      email: updateDto.email,
    };

    if (updateDto.trip_id != null) {
      data.trip = { connect: { trip_id: updateDto.trip_id } };
    }

    type ParticipantWithTrip = Prisma.ParticipantGetPayload<{
      include: { trip: true };
    }>;

    const updated: ParticipantWithTrip = await this.database.participant.update(
      {
        where: { participant_id: id },
        data,
        include: { trip: true },
      },
    );

    return updated;
  }

  async remove(id: number) {
    const exists: Participant | null =
      await this.database.participant.findUnique({
        where: { participant_id: id },
      });

    if (exists == null) {
      throw new NotFoundException(
        `Participant with ID ${String(id)} not found`,
      );
    }

    await this.database.participant.delete({ where: { participant_id: id } });
    return {
      message: `Participant with ID ${String(id)} deleted successfully`,
    };
  }
}
