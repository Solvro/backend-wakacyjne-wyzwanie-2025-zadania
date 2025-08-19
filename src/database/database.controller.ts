import { Controller, Get, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get("/")
  async readTrips() {
    return await this.prisma.trip.findMany();
  }

  @Post("/")
  async createTrip(): Promise<void> {
    await this.prisma.trip.create({
      data: {
        name: "Nowa Wycieczka",
        date: new Date(),
        transport: this.prisma.transport.BUS,
        attractions: "Zamek Królewski",
        duration: 3,
      },
    });
  }
}
