import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateTripDto } from "./dto/create-trip.dto";

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.trip.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        destination: true,
        travel_type: true,
        start_date: true,
        end_date: true,
        coordinator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async create(createTripDto: CreateTripDto, coordinatorId: number) {
    return this.prisma.trip.create({
      data: {
        ...createTripDto,
        start_date: new Date(createTripDto.start_date),
        end_date: new Date(createTripDto.end_date),
        coordinator_id: coordinatorId,
      },
      include: {
        coordinator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.trip.findUnique({
      where: { id },
      include: {
        coordinator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        expenses: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateData: Partial<CreateTripDto>) {
    return this.prisma.trip.update({
      where: { id },
      data: {
        ...updateData,
        ...(updateData.start_date && {
          start_date: new Date(updateData.start_date),
        }),
        ...(updateData.end_date && { end_date: new Date(updateData.end_date) }),
      },
      include: {
        coordinator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.trip.delete({ where: { id } });
  }

  async isCoordinator(tripId: number, userId: number): Promise<boolean> {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      select: { coordinator_id: true },
    });
    return trip?.coordinator_id === userId;
  }
}
