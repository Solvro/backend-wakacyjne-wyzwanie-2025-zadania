import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateParticipantDto } from "./dto/participant.dto";

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async addParticipantToTrip(
    tripId: number,
    createParticipantDto: CreateParticipantDto,
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
}
