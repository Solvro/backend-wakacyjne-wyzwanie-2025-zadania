import { TripType } from "@prisma/client";

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
        type: TripType.LEISURE,
        destination: "Rzym",
        start_date: new Date("2025-08-01"),
        end_date: new Date("2025-08-10"),
      },
    });
  }
}
