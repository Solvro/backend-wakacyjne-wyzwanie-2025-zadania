import { Controller, Get, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database/trips")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get()
  async getAllTrips() {
    return this.prisma.trip.findMany();
  }

  @Get("/full")
  async getAllTripsWithFullData() {
    return this.prisma.trip.findMany({
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  @Post()
  async testCreate() {
    await this.prisma.trip.create({
      data: {
        id: 9999,
        name: "Wakacje 2024",
        destination: "Saloniki, Grecja",
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }
}
