import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import type { ParticipantDto } from "./dto/participant.dto";

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async addParticipantToTrip(
    tripId: number,
    createParticipantDto: ParticipantDto,
  ) {
    // Validate that trip exists
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${String(tripId)} not found`);
    }

    return this.prisma.participant.create({
      data: {
        name: createParticipantDto.name,
        email: createParticipantDto.email,
        phone: createParticipantDto.phone,
        isOrganizer: createParticipantDto.isOrganizer ?? false,
        tripId,
      },
    });
  }

  async updateParticipant(
    participantId: number,
    updateParticipantDto: ParticipantDto,
  ) {
    const existingParticipant = await this.prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (existingParticipant === null) {
      throw new NotFoundException(
        `Participant with ID ${String(participantId)} not found`,
      );
    }

    return this.prisma.participant.update({
      where: { id: participantId },
      data: {
        name: updateParticipantDto.name,
        email: updateParticipantDto.email,
        phone: updateParticipantDto.phone,
        isOrganizer: updateParticipantDto.isOrganizer,
      },
    });
  }

  async deleteParticipant(participantId: number) {
    const existingParticipant = await this.prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (existingParticipant === null) {
      throw new NotFoundException(
        `Participant with ID ${String(participantId)} not found`,
      );
    }

    return this.prisma.participant.delete({
      where: { id: participantId },
    });
  }
}
