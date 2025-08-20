import { Body, Controller, Get, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get("trips")
  async getTrips() {
    return this.databaseService.getTrips();
  }

  @Post("trips")
  async createTrip(
    @Body()
    createTripDto: {
      destination: string;
      description?: string;
      start_date: string;
      end_date?: string;
    },
  ) {
    return this.databaseService.createTrip(createTripDto);
  }
}
