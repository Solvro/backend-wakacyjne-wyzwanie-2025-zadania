import { Role } from "@prisma/client";

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
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/roles.decorator";
import { RoleGuard } from "../auth/roles/roles.guard";
import { CreateTripResponseDto } from "./dto/create-trip-response.dto";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Create a trip",
    description:
      "Add a trip to which you can add participants and connect to expenses",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Trip created",
    type: CreateTripResponseDto,
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips in the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of trips retrieved successfully",
    type: [CreateTripResponseDto],
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrieve detailed information about a specific trip",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Trip details retrieved successfully",
    type: CreateTripResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Trip not found",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Update trip details",
    description: "Modify information for an existing trip",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Trip updated successfully",
    type: CreateTripResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Trip not found",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Delete a trip",
    description: "Remove a trip and all its associated data from the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Trip deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Trip not found",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}
