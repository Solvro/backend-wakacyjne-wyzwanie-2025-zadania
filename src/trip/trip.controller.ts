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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { CreateTripResponseDto } from "./dto/create-trip-response.dto";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new trip",
    description:
      "Add a trip to which will be later used for Participants and Expenses",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully",
    type: CreateTripResponseDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, "TRIPCORD")
  @ApiBearerAuth("access-token")
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips retrieved successfully",
    type: [CreateTripResponseDto],
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get a trip by ID",
    description: "Retrieve details of a specific trip using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Trip details retrieved successfully",
    type: CreateTripResponseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update a trip",
    description: "Modify details of an existing trip using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully",
    type: UpdateTripDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, "TRIPCORD")
  @ApiBearerAuth("access-token")
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete a trip",
    description: "Remove a trip using its ID",
  })
  @ApiResponse({
    status: 204,
    description: "Trip deleted successfully",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
