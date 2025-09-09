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
import { TripService } from "./trip.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/user-role.guard";
import { Roles } from "../auth/roles/role.decorator";
import { Role } from "@prisma/client";
import { TripPrivateResponseDto } from "./dto/trip-private-response.dto";

@Controller("trip")
@ApiTags("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // PUBLIC
  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips in the system with their participants and expenses",
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
    description: "Retrieve detailed information about a specific trip including expenses and participants",
  })
  @ApiResponse({
    status: 200,
    description: "Trip details retrieved successfully",
    type: TripResponseDto,
  })
  @ApiResponse({ 
    status: 404, 
    description: "Trip not found" 
  })
  async findOnePublic(@Param("id") id: string) {
    return this.tripService.findOnePublic(+id);
  }

  // PRIVATE: ADMIN lub ORGANIZER 
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.ORGANIZER)
  @Get("private/:id")
  @ApiOperation({ 
    summary: "Get trip by ID (private)",
    description: "Retrieve detailed private information about a specific trip for authorized users"
  })
  @ApiResponse({
    status: 200,
    description: "Trip detail (private) retrieved successfully",
    type: TripPrivateResponseDto,
  })
  @ApiResponse({ 
    status: 404, 
    description: "Trip not found" 
  })
  async findOnePrivate(@Param("id") id: string) {
    return this.tripService.findOnePrivate(+id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.ORGANIZER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new trip",
    description: "Add a trip to which you can supply new expenses and participants",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully",
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  async create(@Body() dto: CreateTripDto) {
    return this.tripService.create(dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.ORGANIZER)
  @Patch(":id")
  @ApiOperation({
    summary: "Update trip details",
    description: "Modify information for an existing trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully",
    type: TripResponseDto,
  })
  @ApiResponse({ 
    status: 404, 
    description: "Trip not found" 
  })
  async update(@Param("id") id: string, @Body() dto: UpdateTripDto) {
    return this.tripService.update(+id, dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.ORGANIZER)
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
    description: "Trip not found" 
  })
  async remove(@Param("id") id: number): Promise<void> {
    await this.tripService.remove(id);
  }
}
