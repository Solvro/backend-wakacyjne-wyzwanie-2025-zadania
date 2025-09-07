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

// import { AddParticipantDto } from './dto/add-participant.dto';

@Controller("trip")
@ApiTags("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new trip" })
  @ApiResponse({
    status: 201,
    description: "The trip has been successfully created.",
    type: TripResponseDto,
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all trips" })
  @ApiResponse({
    status: 200,
    description: "List of all trips",
    type: TripResponseDto,
    isArray: true,
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a trip by ID" })
  @ApiResponse({
    status: 200,
    description: "The trip with the specified ID",
    type: TripResponseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a trip by ID" })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully updated.",
    type: TripResponseDto,
  })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a trip by ID" })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully deleted.",
  })
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
