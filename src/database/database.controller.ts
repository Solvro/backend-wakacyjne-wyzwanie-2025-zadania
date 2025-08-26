import { Controller, Get, Post } from "@nestjs/common";

import { Trip as TripModel } from "../../generated/prisma";
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
        location: "Test Trip",
        createdAt: new Date(),
      },
    });
  }
}
