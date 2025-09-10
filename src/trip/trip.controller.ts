import { Body, Controller, Get, Post } from "@nestjs/common";

import { TripService } from "./trip.service";

@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  async getAllTrips() {
    return this.tripService.getAllTrips();
  }

  @Post()
  async createTrip(
    @Body() body: { name: string; startDate: string; budget?: number },
  ) {
    return this.tripService.createTrip({
      name: body.name,
      startDate: new Date(body.startDate),
      budget: body.budget,
    });
  }
}
