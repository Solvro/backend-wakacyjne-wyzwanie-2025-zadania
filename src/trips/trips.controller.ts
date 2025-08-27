import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { TripsService } from "./trips.service";

@ApiTags("trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  @ApiOperation({ summary: "Get all trips" })
  @ApiResponse({ status: 200, description: "Return all trips." })
  async findAll() {
    return this.tripsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Create a new trip" })
  @ApiResponse({
    status: 201,
    description: "The trip has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }
}
