import { Roles } from "src/auth/roles/roles.decorator";
import { RolesGuard } from "src/auth/roles/roles.guard";
import type { RequestWithUser } from "src/common/interfaces/jwt-payload.interface";

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

import { AuthGuard } from "../auth/auth.guard";
import { CreateTripDto } from "./dto/create-trip.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

// import { AddParticipantDto } from './dto/add-participant.dto';

@Controller("trip")
@ApiTags("trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new trip" })
  @ApiResponse({
    status: 201,
    description: "The trip has been successfully created.",
    type: TripResponseDto,
  })
  async create(
    @Body() createTripDto: CreateTripDto,
    @Req() request: RequestWithUser,
  ) {
    if (request.user == null) {
      throw new Error("User information is missing in the request");
    }
    return this.tripService.create(createTripDto, request.user);
  }

  @Get()
  @ApiOperation({ summary: "Get all trips" })
  @ApiResponse({
    status: 200,
    description: "List of all trips",
    type: TripResponseDto,
    isArray: true,
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a trip by ID" })
  @ApiResponse({
    status: 200,
    description: "The trip with the specified ID",
    type: TripResponseDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles("ADMIN", "COORDINATOR")
  @ApiOperation({ summary: "Update a trip by ID" })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully updated.",
    type: TripResponseDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateTripDto: UpdateTripDto,
    @Req() request: RequestWithUser,
  ) {
    if (request.user == null) {
      throw new Error("User information is missing in the request");
    }
    return this.tripService.update(+id, updateTripDto, {
      sub: request.user.sub,
      role: request.user.role,
    });
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles("ADMIN", "COORDINATOR")
  @ApiOperation({ summary: "Delete a trip by ID" })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully deleted.",
  })
  async remove(
    @Param("id", ParseIntPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    if (request.user == null) {
      throw new Error("User information is missing in the request");
    }
    return this.tripService.remove(+id, {
      sub: request.user.sub,
      role: request.user.role,
    });
  }
}
