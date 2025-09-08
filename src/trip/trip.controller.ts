import { Role } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { AuthGuard } from "src/auth/auth.guard";
import type { RequestWithUser } from "src/auth/dto/request-with-user.dto";
import { Roles } from "src/auth/roles/role.decorator";
import { RoleGuard } from "src/auth/roles/role.guard";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { TripResponsePrivateDto } from "./dto/trip-response-private.dto";
import { TripResponsePublicDto } from "./dto/trip-response-public.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("trips")
@ApiBearerAuth()
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
    type: TripResponsePublicDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data.",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
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
    type: [TripResponsePublicDto],
  })
  @ApiResponse({
    status: 200,
    description: "Details of all trips retrieved successfully.",
    type: [TripResponsePrivateDto],
  })
  async findAll(@Req() request: RequestWithUser) {
    const user = request.user;
    const trips = await this.tripService.findAll();

    return user == null
      ? plainToInstance(TripResponsePublicDto, trips)
      : plainToInstance(TripResponsePrivateDto, trips);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description:
      "Retrieves detailed information about a specific trip by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Public trip details retrieved successfully.",
    type: TripResponsePublicDto,
  })
  @ApiResponse({
    status: 200,
    description: "All trip details retrieved successfully.",
    type: TripResponsePrivateDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    const trip = await this.tripService.findOne(id);
    return user == null
      ? plainToInstance(TripResponsePublicDto, trip)
      : plainToInstance(TripResponsePrivateDto, trip);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update trip details.",
    description: "Updates the details of an existing trip by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully.",
    type: TripResponsePublicDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}
