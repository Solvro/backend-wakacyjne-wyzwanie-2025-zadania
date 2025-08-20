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
        id: 11,
        name: "Testowa wycieczka 2",
        start: new Date("2024-03-27"),
        end: new Date("2025-03-27"),
      },
    });
  }
}
