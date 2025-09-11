import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.participant.findMany({
      include: { trip: true, expenses: true },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.participant.findUnique({
      where: { id },
      include: { trip: true, expenses: true },
    });
    if (item === null) {
      throw new NotFoundException("Participant not found");
    }
    return item;
  }

  async create(dto: CreateParticipantDto) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: dto.tripId },
    });
    if (trip === null) {
      throw new NotFoundException(
        `Trip with id ${String(dto.tripId)} not found`,
      );
    }

    return this.prisma.participant.create({
      data: {
        name: dto.name,
        lastname: dto.lastname,
        email: dto.email,
        role: dto.role,
        tripId: dto.tripId,
      },
    });
  }

  async update(id: number, dto: UpdateParticipantDto) {
    await this.ensureExists(id);

    if (dto.tripId !== undefined) {
      const trip = await this.prisma.trip.findUnique({
        where: { id: dto.tripId },
      });
      if (trip === null) {
        throw new NotFoundException(
          `trip with id ${String(dto.tripId)} not found`,
        );
      }
    }

    const { name, lastname, email, role } = dto;
    return this.prisma.participant.update({
      where: { id },
      data: { name, lastname, email, role },
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    await this.prisma.participant.delete({ where: { id } });
    return { deleted: true };
  }

  private async ensureExists(id: number) {
    const exists = await this.prisma.participant.findUnique({ where: { id } });
    if (exists === null) {
      throw new NotFoundException("Participant not found");
    }
  }
}
