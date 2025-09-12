import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTrips() {
    return this.prisma.trip.findMany({
      include: {
        participants: {
          include: { expenses: true },
        },
      },
    });
  }

  async createTrip(data: CreateTripDto) {
    return this.prisma.trip.create({
      data,
    });
  }

  async updateTrip(id: number, data: UpdateTripDto) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (trip === null) {
      throw new NotFoundException("Trip not found");
    }

    return this.prisma.trip.update({
      where: { id },
      data,
    });
  }
}
