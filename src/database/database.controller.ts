import { Controller, Get, Put } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database_test")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}
  @Get()
  async get_trips() {
    return this.prisma.trip.findMany();
  }
  @Put()
  async add_trip() {
    return this.prisma.trip.create({
      data: {
        title: "Wycieczka do Rzymu",
        description: "Zwiedzanie Koloseum i Watykanu",
        startDate: new Date("2023-11-01"),
        endDate: new Date("2023-11-05"),
      },
    });
  }
}
