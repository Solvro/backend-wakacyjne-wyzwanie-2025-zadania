import { TripStatus } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    const { status, ...rest } = createTripDto;
    return this.prisma.trip.create({
      data: {
        ...rest,
        status: status as TripStatus,
      },
    });
  }

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        participants: true,
        expenses: {
          include: {
            expense_participants: {
              include: {
                participant: true,
              },
            },
          },
        },
      },
    });

    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    const { status, ...rest } = updateTripDto;
    return this.prisma.trip.update({
      where: { id },
      data: {
        ...rest,
        ...(status !== undefined && { status: status as TripStatus }),
      },
    });
  }

  async remove(id: number) {
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    await this.prisma.expenseParticipant.deleteMany({
      where: { trip_id: id },
    });

    await this.prisma.expense.deleteMany({
      where: { trip_id: id },
    });

    await this.prisma.participant.deleteMany({
      where: { trip_id: id },
    });

    return this.prisma.trip.delete({
      where: { id },
    });
  }

  async findTripsByStatus(status: string) {
    return this.prisma.trip.findMany({
      where: { status: status as TripStatus },
      include: {
        participants: true,
        expenses: true,
      },
    });
  }
}
