import { sex } from "generated/prisma";

import { Body, Controller, Get, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private readonly prisma: DatabaseService) {}

  @Get("trips")
  async getAllTrips() {
    const response = await this.prisma.trip.findMany();
    return response;
  }

  @Post("participants")
  async createParticipant(
    @Body()
    data: {
      first_name: string;
      last_name: string;
      address: string;
      phone_number: string;
      sex: sex;
    },
  ) {
    const response = await this.prisma.participant.create({ data });
    return response;
  }
}
