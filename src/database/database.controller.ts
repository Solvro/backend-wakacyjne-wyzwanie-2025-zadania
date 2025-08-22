import { Controller, Get } from "@nestjs/common";
import { Expense, Participant, Trip } from "@prisma/client";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get("/Trip")
  async testTrip(): Promise<Trip[]> {
    return await this.prisma.trip.findMany();
  }

  @Get("/Participant")
  async testParticipant(): Promise<Participant[]> {
    return await this.prisma.participant.findMany();
  }

  @Get("/Expense")
  async testExpense(): Promise<Expense[]> {
    return await this.prisma.expense.findMany();
  }
}
