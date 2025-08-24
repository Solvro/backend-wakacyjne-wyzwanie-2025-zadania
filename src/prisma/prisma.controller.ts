import { Controller, Get, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PrismaService } from "./prisma.service";

@Controller("database")
@ApiTags("database")
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("trips")
  @ApiResponse({
    status: 200,
    description: "List of trips retrieved successfully",
  })
  @ApiOperation({ summary: "Get all trips" })
  async getTrips() {
    return await this.prisma.trip.findMany();
  }

  @Put("trips")
  @ApiResponse({
    status: 200,
    description: "Example Trip created successfully",
  })
  @ApiOperation({ summary: "Create a test trip" })
  async testCreateTrips() {
    return await this.prisma.trip.create({
      data: {
        Destination: "Test Trip",
        Description: "This is a test trip.",
        Start_date: new Date(),
        End_date: new Date(),
        Created_at: new Date(),
        Updated_at: new Date(),
      },
    });
  }

  @Get("participants")
  @ApiResponse({
    status: 200,
    description: "List of participants retrieved successfully",
  })
  @ApiOperation({ summary: "Get all participants" })
  async getParticipants() {
    return await this.prisma.participant.findMany();
  }
  @Get("expenses")
  @ApiResponse({
    status: 200,
    description: "List of expenses retrieved successfully",
  })
  @ApiOperation({ summary: "Get all expenses" })
  async getExpenses() {
    return await this.prisma.expense.findMany();
  }
}
