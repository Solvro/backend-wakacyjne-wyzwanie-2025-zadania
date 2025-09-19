import { Role } from "@prisma/client";

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
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Public, Roles } from "../auth/roles";
import { RolesGuard } from "../auth/roles.guard";
import { CreateTripDto } from "./dto/create-trip.dto";
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
    description: "Trip created",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips in the system",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips retrieved successfully",
  })
  @Public()
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrieve detailed information about a specific trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip details retrieved successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  @Public()
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
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
