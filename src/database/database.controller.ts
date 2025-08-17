import { Participant, Trip } from "@prisma/client";

import { Body, Controller, Get, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private readonly prisma: DatabaseService) {}

  @Get("trips")
  async getAllTrips(): Promise<Trip[]> {
    return await this.prisma.trip.findMany();
  }

  @Post("participants")
  async createParticipant(
    @Body()
    data: {
      first_name: string;
      last_name: string;
      address: string;
      phone_number: string;
      sex: string;
    },
  ): Promise<Participant> {
    return await this.prisma.participant.create({ data });
  }
}
