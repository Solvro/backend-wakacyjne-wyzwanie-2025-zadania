import { PrismaClient } from "@prisma/client";

import { Injectable } from "@nestjs/common";

@Injectable()
export class TripService {
  private prisma = new PrismaClient();

  async getAllTrips() {
    return this.prisma.trip.findMany({
      include: { participants: true, expenses: true },
    });
  }

  async createTrip(data: { name: string; startDate: Date; budget?: number }) {
    return this.prisma.trip.create({
      data,
    });
  }
}
