import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new trip",
    description:
      "Creates a new trip. You can later add expenses and participants.",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully.",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data.",
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieves a list of all trips in the database.",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips retrieved successfully.",
    type: [TripResponseDto],
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description:
      "Retrieves detailed information about a specific trip by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Trip retrieved successfully.",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update trip details.",
    description: "Updates the details of an existing trip by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully.",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a trip by ID",
    description: "Deletes a specific trip and all associated data.",
  })
  @ApiResponse({
    status: 200,
    description: "Trip deleted successfully.",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
