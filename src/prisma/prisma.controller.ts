import { Controller, Get } from "@nestjs/common";
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
