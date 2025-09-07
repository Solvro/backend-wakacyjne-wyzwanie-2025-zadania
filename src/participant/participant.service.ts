import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(dto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
      },
    });
  }

  async findAll() {
    return this.prisma.participant.findMany({
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    const p = await this.prisma.participant.findUnique({
      where: { id },
      include: {
        memberships: { include: { trip: true } },
        paidExpenses: true,
      },
    });
    if (p == null) {
      throw new NotFoundException(`Participant ${String(id)} not found`);
    }
    return p;
  }

  async update(id: number, dto: UpdateParticipantDto) {
    return this.prisma.participant.update({
      where: { id },
      data: {
        firstName: dto.firstName ?? undefined,
        lastName: dto.lastName ?? undefined,
        email: dto.email ?? undefined,
      },
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.participant.delete({ where: { id } });
      return { success: true };
    } catch {
      throw new NotFoundException(`Participant ${String(id)} not found`);
    }
  }

  async listTrips(participantId: number) {
    await this.ensureParticipant(participantId);
    const ms = await this.prisma.tripParticipant.findMany({
      where: { participantId },
      include: { trip: true },
      orderBy: { tripId: "asc" },
    });
    return ms.map((m) => m.trip);
  }

  async joinTrip(participantId: number, tripId: number) {
    await this.ensureParticipant(participantId);
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (trip == null) {
      throw new NotFoundException(`Trip ${String(tripId)} not found`);
    }

    return this.prisma.tripParticipant.upsert({
      where: { tripId_participantId: { tripId, participantId } },
      update: {},
      create: { tripId, participantId },
    });
  }

  async leaveTrip(participantId: number, tripId: number) {
    return this.prisma.tripParticipant.delete({
      where: { tripId_participantId: { tripId, participantId } },
    });
  }

  private async ensureParticipant(id: number) {
    const p = await this.prisma.participant.findUnique({ where: { id } });
    if (p == null) {
      throw new NotFoundException(`Participant ${String(id)} not found`);
    }
  }
}
