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

import { Public } from "../common/decorators/public.decorator";
import { Roles } from "../common/decorators/roles.decorator";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("trips")
@Controller("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Get all trips" })
  @ApiOkResponse({ description: "List of trips" })
  @ApiBadRequestResponse({ description: "Invalid query" })
  async getAllTrips() {
    return this.tripService.getAllTrips();
  }

  @Post()
  @Roles("COORDINATOR", "ADMIN") // Only coordinators or admins can post
  @ApiOperation({ summary: "Create a new trip" })
  @ApiCreatedResponse({ description: "Created trip" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async createTrip(@Body() dto: CreateTripDto) {
    return this.tripService.createTrip(dto);
  }

  @Patch(":id")
  @Roles("COORDINATOR", "ADMIN") // Only coordinators or admins can update
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
