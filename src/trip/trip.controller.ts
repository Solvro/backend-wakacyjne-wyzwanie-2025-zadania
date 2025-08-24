import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { TripService } from "./trip.service";

@ApiTags("trips")
@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  @ApiOperation({ summary: "Get all trips" })
  @ApiOkResponse({ description: "List of trips" })
  async getAllTrips() {
    return this.tripService.getAllTrips();
  }

  @Post()
  @ApiOperation({ summary: "Create a new trip" })
  @ApiOkResponse({ description: "The created trip" })
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
