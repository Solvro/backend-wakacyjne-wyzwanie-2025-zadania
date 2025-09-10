import { Trip as TripModel } from "@prisma/client";

import { Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@Controller("database/trips")
@ApiTags("databaseTrips")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: "Get all test trips" })
  @ApiResponse({ status: 200, description: "List of all test trips" })
  async testRead(): Promise<TripModel[]> {
    return this.prisma.trip.findMany();
  }

  @Post()
  @ApiOperation({ summary: "Create a test trip" })
  @ApiResponse({ status: 201, description: "Test trip created" })
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
