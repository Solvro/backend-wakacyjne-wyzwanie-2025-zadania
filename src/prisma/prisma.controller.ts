import { Controller, Get, Put } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

@Controller("database")
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("trips")
  async getTrips() {
    return await this.prisma.trip.findMany();
  }

  @Put("trips")
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
  async getParticipants() {
    return await this.prisma.participant.findMany();
  }
  @Get("expenses")
  async getExpenses() {
    return await this.prisma.expense.findMany();
  }
}
