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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { ResponseTripDto } from "./dto/response-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("Trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Created a new trip",
  })
  @ApiCreatedResponse({
    description: "Created a new trip",
  })
  @ApiResponse({
    status: 201,
    description: "Created a new trip",
    type: CreateTripDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid trip data",
  })
  @ApiResponse({
    status: 500,
    description: "Server error",
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Returning all trips",
  })
  @ApiResponse({
    status: 200,
    description: "Trips returned",
    type: [ResponseTripDto],
  })
  @ApiResponse({
    status: 404,
    description: "Trips not found",
  })
  @ApiResponse({
    status: 500,
    description: "Server error",
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Found a trip with given id",
  })
  @ApiResponse({
    status: 200,
    description: "Trip found",
    type: ResponseTripDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  @ApiResponse({
    status: 500,
    description: "Server error",
  })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Updated a trip with given id",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated",
    type: UpdateTripDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trips not found",
  })
  @ApiResponse({
    status: 500,
    description: "Server error",
  })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deleted a trip with given id",
  })
  @ApiResponse({
    status: 200,
    description: "Trip deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Trips not found",
  })
  @ApiResponse({
    status: 500,
    description: "Server error",
  })
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
