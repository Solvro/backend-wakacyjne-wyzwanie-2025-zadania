import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateTripDto } from "./dto/create-trip.dto";

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

  async createTrip(data: { name: string; startDate: Date; budget?: number }) {
    return this.prisma.trip.create({
      data,
    });
  }

  async updateTrip(id: number, data: Partial<CreateTripDto>) {
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
