import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("trips")
@Controller("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  @ApiOperation({ summary: "Get all trips" })
  @ApiOkResponse({ description: "List of trips" })
  @ApiBadRequestResponse({ description: "Invalid query" })
  async getAllTrips() {
    return this.tripService.getAllTrips();
  }

  @Post()
  @ApiOperation({ summary: "Create a new trip" })
  @ApiCreatedResponse({ description: "Created trip" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async createTrip(@Body() dto: CreateTripDto) {
    return this.tripService.createTrip(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a trip" })
  @ApiOkResponse({ description: "Updated trip" })
  @ApiNotFoundResponse({ description: "trip not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async updateTrip(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTripDto,
  ) {
    return this.tripService.updateTrip(id, dto);
  }
}
