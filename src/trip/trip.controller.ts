import { TripRole, UserRole } from "@prisma/client";

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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/user-role.guard";
import { TripRoles } from "../auth/roles/trip-role.decorator";
import { TripRoleGuard } from "../auth/roles/trip-role.guard";
import { IdParameterDto } from "../validators/id-parameter.dto";
import { CreateTripDto } from "./dto/create-trip.dto";
import { TripPrivateResponseDto } from "./dto/trip-private-response.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  //PUBLIC
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
  @ApiParam({
    name: "id",
    description: "Trip ID",
    example: 1,
    type: "integer",
  })
  @ApiResponse({
    status: 200,
    description: "Trip details retrieved successfully",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid trip ID format",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async findOnePublic(@Param() parameters: IdParameterDto) {
    return this.tripService.findOnePublic(parameters.id);
  }

  // PRIVATE
  @UseGuards(AuthGuard, RoleGuard, TripRoleGuard)
  @Roles(UserRole.ADMIN)
  @TripRoles(TripRole.ORGANIZER)
  @Get("private/:id")
  @ApiOperation({
    summary: "Get trip by ID (private)",
    description:
      "Retrieve detailed private information about a specific trip for authorized users",
  })
  @ApiParam({
    name: "id",
    description: "Trip ID",
    example: 1,
    type: "integer",
  })
  @ApiResponse({
    status: 200,
    description: "Trip detail (private) retrieved successfully",
    type: TripPrivateResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid trip ID format",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - authentication required",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - insufficient permissions",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async findOnePrivate(@Param() parameters: IdParameterDto) {
    return this.tripService.findOnePrivate(parameters.id);
  }

  @UseGuards(AuthGuard, RoleGuard, TripRoleGuard)
  @Roles(UserRole.ADMIN)
  @TripRoles(TripRole.ORGANIZER)
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
    description: "Invalid input data (validation errors)",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - authentication required",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - insufficient permissions",
  })
  async create(@Body() dto: CreateTripDto) {
    return this.tripService.create(dto);
  }

  @UseGuards(AuthGuard, RoleGuard, TripRoleGuard)
  @Roles(UserRole.ADMIN)
  @TripRoles(TripRole.ORGANIZER)
  @Patch(":id")
  @ApiOperation({
    summary: "Update trip details",
    description: "Modify information for an existing trip",
  })
  @ApiParam({
    name: "id",
    description: "Trip ID",
    example: 1,
    type: "integer",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data or trip ID format",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - authentication required",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - insufficient permissions",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async update(
    @Param() parameters: IdParameterDto,
    @Body() dto: UpdateTripDto,
  ) {
    return this.tripService.update(parameters.id, dto);
  }

  @UseGuards(AuthGuard, RoleGuard, TripRoleGuard)
  @Roles(UserRole.ADMIN)
  @TripRoles(TripRole.ORGANIZER)
  @Delete(":id")
  @ApiOperation({
    summary: "Delete a trip",
    description: "Remove a trip and all its associated data from the system",
  })
  @ApiParam({
    name: "id",
    description: "Trip ID",
    example: 1,
    type: "integer",
  })
  @ApiResponse({
    status: 200,
    description: "Trip deleted successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid trip ID format",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - authentication required",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - insufficient permissions",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async remove(@Param() parameters: IdParameterDto): Promise<void> {
    await this.tripService.remove(parameters.id);
  }
}
