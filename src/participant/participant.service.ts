import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";

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
        trips: true,        // zamiast memberships -> trips
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

    return this.prisma.trip.findMany({
      where: { participants: { some: { id: participantId } } },
      orderBy: { id: "asc" },
    });
  }



  async joinTrip(participantId: number, tripId: number) {
    // 1) istnienie obu encji
    await this.ensureParticipant(participantId);
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      select: { id: true },
    });
    if (trip == null) {
      throw new NotFoundException(`Trip ${String(tripId)} not found`);
    }

    await this.prisma.trip.update({
      where: { id: tripId },
      data: { participants: { connect: { id: participantId } } },
    });

    return this.prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        participants: true,
        expenses: true,
      },
    });
  }


  async leaveTrip(participantId: number, tripId: number) {
    // sprawdź, czy obie encje istnieją
    await this.ensureParticipant(participantId);
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId }, select: { id: true } });
    if (trip == null) {
      throw new NotFoundException(`Trip ${String(tripId)} not found`);
    }

    // opcjonalnie: wymuś, że musi być członkiem (jak wcześniej)
    const isMember = await this.prisma.trip.count({
      where: { id: tripId, participants: { some: { id: participantId } } },
    });
    if (isMember === 0) {
      throw new BadRequestException(`Participant ${String(participantId)} is not a member of Trip ${String(tripId)}`);
    }

    // odłącz uczestnika od tripa
    return this.prisma.trip.update({
      where: { id: tripId },
      data: {
        participants: { disconnect: { id: participantId } },
      },
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  private async ensureParticipant(id: number) {
    const p = await this.prisma.participant.findUnique({ where: { id } });
    if (p == null) {
      throw new NotFoundException(`Participant ${String(id)} not found`);
    }
  }
}
