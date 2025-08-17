import { Prisma, Trip } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

@Injectable()
export class TripService {
  constructor(private prisma: DatabaseService) {}

  async all(): Promise<Trip[]> {
    return this.prisma.trip.findMany();
  }

  async trip(
    tripWhereUniqueInput: Prisma.TripWhereUniqueInput,
  ): Promise<Trip | null> {
    return this.prisma.trip.findUnique({ where: tripWhereUniqueInput });
  }

  async createTrip(data: Prisma.TripCreateInput): Promise<Trip> {
    return this.prisma.trip.create({ data });
  }
}
