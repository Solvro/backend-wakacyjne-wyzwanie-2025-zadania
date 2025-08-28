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
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripResponseDto } from "./dto/create-trip-response.dto";
import { CreateTripDto } from "./dto/create-trip.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("trips")
@Controller("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new trip",
    description: "Add a new trip to the system",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully",
    type: CreateTripResponseDto,
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips returned successfully",
    type: [CreateTripResponseDto],
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.tripService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrieve a single trip using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Trip found",
    type: CreateTripResponseDto,
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
    summary: "Update trip",
    description: "Update an existing trip by ID",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully",
    type: CreateTripResponseDto,
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
    summary: "Delete trip",
    description: "Remove an existing trip by ID",
  })
  @ApiResponse({
    status: 200,
    description: "Trip deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
