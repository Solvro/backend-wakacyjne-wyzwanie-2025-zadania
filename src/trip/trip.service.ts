import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(dto: CreateTripDto) {
  return this.prisma.trip.create({
    data: {
      name: dto.name,
      destination: dto.destination ?? null,
      budget: dto.budget == null ? null : new Prisma.Decimal(dto.budget),
      startDate: new Date(dto.startDate),
      endDate: dto.endDate == null ? null : new Date(dto.endDate),
      ...(Array.isArray(dto.participantIds) && dto.participantIds.length > 0
        ? { participants: { connect: dto.participantIds.map((id) => ({ id })) } }
        : {}),
    },
    include: { participants: true, expenses: true },
  });
}


  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        expenses: true,
        participants: true,
      },
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        expenses: true,
        participants: true,
      },
    });
    if (trip == null) {
      throw new NotFoundException(`Trip ${String(id)} not found`);
    }
    return trip;
  }

  async update(id: number, dto: UpdateTripDto) {
    const endDateField =
      "endDate" in dto
        ? { endDate: dto.endDate == null ? null : new Date(dto.endDate) }
        : {};

    return this.prisma.trip.update({
      where: { id },
      data: {
        name: dto.name ?? undefined,
        destination: dto.destination ?? undefined,
        budget:
          dto.budget === undefined ? undefined : new Prisma.Decimal(dto.budget),
        startDate:
          dto.startDate === undefined ? undefined : new Date(dto.startDate),
        ...endDateField,
        participants: {
          set: (dto.participantIds ?? []).map((pid) => ({ id: pid })),
        }
      },
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.trip.delete({ where: { id } });
      return { success: true };
    } catch {
      throw new NotFoundException(`Trip ${String(id)} not found`);
    }
  }
}
