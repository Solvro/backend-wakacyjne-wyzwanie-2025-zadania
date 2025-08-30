import { Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@Controller("database/trips")
@ApiTags("DatabaseTest")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: "Retrieves all test trips." })
  @ApiResponse({
    status: 200,
    description: "A list of test trips.",
  })
  async getAllTrips() {
    return this.prisma.trip.findMany();
  }

  @Get("/full")
  @ApiOperation({ summary: "Retrieves all test trips with full data." })
  @ApiResponse({
    status: 200,
    description: "A list of test trips with full data.",
  })
  async getAllTripsWithFullData() {
    return this.prisma.trip.findMany({
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  @Post()
  @ApiOperation({ summary: "Inserts a dummy test trip." })
  @ApiResponse({
    status: 201,
    description: "Test trip created successfully.",
  })
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
