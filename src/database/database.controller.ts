import { Controller, Get } from "@nestjs/common";
//import { Trip } from "@prisma/client";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}
/*  @Get("/")
  async testTrip(): Promise<Trip[]> {
    return await this.prisma.trip.findMany();
  }*/
}