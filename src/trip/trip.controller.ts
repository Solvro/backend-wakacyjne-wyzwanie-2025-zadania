import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/roles.decorator";
import { RoleGuard } from "src/auth/roles/roles.guard";
import { PaginationDto } from "src/pagination/pagination.dto";

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
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripResponseDto } from "./dto/create-trip-response.dto";
import { CreateTripDto } from "./dto/create-trip.dto";
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Trip_Coordinator)
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
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Trip_Coordinator)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Trip_Coordinator)
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}
