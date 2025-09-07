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
      "Add a trip to which you can supply new expenses and participants",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description:
      "Retrieve a list of all trips in the system with their participants and expenses",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips retrieved successfully",
    type: [TripResponseDto],
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description:
      "Retrieve detailed information about a specific trip including expenses and participants",
  })
  @ApiResponse({
    status: 200,
    description: "Trip details retrieved successfully",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update trip details",
    description: "Modify information for an existing trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a trip",
    description: "Remove a trip and all its associated data from the system",
  })
  @ApiResponse({
    status: 200,
    description: "Trip deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async remove(@Param("id") id: number): Promise<void> {
    await this.tripService.remove(id);
  }
}
