import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

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
}
