import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.trip.findMany();
  }

  async create(data: Prisma.TripCreateInput) {
    return this.prisma.trip.create({ data });
  }
}
