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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Created a new trip",
    description:
      "Added a trip to which you can supply new expenses and participants",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created",
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Returning all trips",
    description: "Returned all trips!",
  })
  @ApiResponse({
    status: 201,
    description: "Trips returned",
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Found a trip with given id",
    description: "Found a trip with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Trip found!",
  })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Updated a trip with given id",
    description: "Updated a trip with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Trip updated!",
  })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Deleted a trip with given id",
    description: "Deleted a trip with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Trip deleted!",
  })
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
