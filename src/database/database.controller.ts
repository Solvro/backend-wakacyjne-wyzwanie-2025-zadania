import { Trip as TripModel } from "@prisma/client";

import { Controller, Get, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get("/")
  async testRead(): Promise<TripModel[]> {
    return await this.prisma.trip.findMany();
  }

  @Post("/")
  async testCreate(): Promise<void> {
    await this.prisma.trip.create({
      data: {
        id: 9999,
        title: "Test Trip",
        description: "This is a test trip",
        startDate: new Date(),
        endDate: new Date(),
      },
    });
  }
}
