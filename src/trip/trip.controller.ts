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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create trip",
    description: "Creates a new trip",
  })
  @ApiResponse({
    status: 201,
    description: "The trip has been successfully created.",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Invalid input data.",
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieves all trips with their participants and expenses",
  })
  @ApiQuery({
    name: "status",
    required: false,
    description: "Filter trips by status",
    enum: ["planned", "active", "finished", "cancelled"],
  })
  @ApiResponse({
    status: 200,
    description: "The trips have been successfully retrieved.",
    type: [TripResponseDto],
  })
  async findAll(@Query("status") status?: string) {
    if (status) {
      return this.tripService.findTripsByStatus(status);
    }
    return this.tripService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrieves a single trip by its ID with all related data",
  })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully retrieved.",
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update trip by ID",
    description: "Updates a single trip by its ID",
  })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully updated.",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Invalid input data.",
  })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete trip by ID",
    description: "Deletes a single trip by its ID",
  })
  @ApiResponse({
    status: 204,
    description: "The trip has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
