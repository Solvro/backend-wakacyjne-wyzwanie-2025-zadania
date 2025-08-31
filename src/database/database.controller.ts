import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@Controller("database")
@ApiTags("database-test")
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get("trips")
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieves a list of all trips from the database.",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips retrieved successfully.",
  })
  async testGetTrips() {
    return this.databaseService.getTrips();
  }

  @Post("trips")
  @ApiOperation({
    summary: "Create a new trip",
    description: "Adds a new trip to the database.",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully.",
  })
  async testCreateTrip(
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
