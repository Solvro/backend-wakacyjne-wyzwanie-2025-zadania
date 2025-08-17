import { sex } from "generated/prisma";

import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private readonly prisma: DatabaseService) {}

  @Get("trips")
  async getAllTrips() {
    return this.prisma.trip.findMany();
  }

  @Post("participants")
  createParticipant(
    @Body()
    data: {
      first_name: string;
      last_name: string;
      address: string;
      phone_number: string;
      sex: sex;
    },
  ) {
    return this.prisma.participant.create({ data });
  }
}
