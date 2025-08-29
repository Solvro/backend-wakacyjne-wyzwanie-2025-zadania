import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ExpenseResponseDto } from "../expenses/dto/expense-response.dto";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { CreateTripDto } from "./dto/create-trip.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripsService } from "./trips.service";

@ApiTags("trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly service: TripsService) {}

  @ApiOperation({ summary: "Create a new trip" })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully.",
    type: TripResponseDto,
  })
  @Post()
  async create(@Body() dto: CreateTripDto): Promise<TripResponseDto> {
    return await this.service.create(dto);
  }

  @ApiOperation({ summary: "Get all trips" })
  @ApiResponse({
    status: 200,
    description: "List of all trips.",
    type: [TripResponseDto],
  })
  @Get()
  async findAll(): Promise<TripResponseDto[]> {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: "Get trip by ID" })
  @ApiResponse({
    status: 200,
    description: "Trip found.",
    type: TripResponseDto,
  })
  @ApiResponse({ status: 404, description: "Trip not found." })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<TripResponseDto | null> {
    return await this.service.findOne(id);
  }

  @ApiOperation({ summary: "Update trip by ID" })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully.",
    type: TripResponseDto,
  })
  @ApiResponse({ status: 404, description: "Trip not found." })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTripDto,
  ): Promise<TripResponseDto> {
    return await this.service.update(id, dto);
  }

  @ApiOperation({ summary: "Delete trip by ID" })
  @ApiResponse({
    status: 200,
    description: "Trip deleted.",
    type: TripResponseDto,
  })
  @ApiResponse({ status: 404, description: "Trip not found." })
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<TripResponseDto> {
    return await this.service.remove(id);
  }

  @ApiOperation({ summary: "Get all participants of a trip" })
  @ApiResponse({
    status: 200,
    description: "List of participants.",
    type: [UserResponseDto],
  })
  @Get(":id/participants")
  async getParticipants(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<UserResponseDto[]> {
    return await this.service.getParticipants(id);
  }

  @ApiOperation({ summary: "Get all expenses for a trip" })
  @ApiResponse({
    status: 200,
    description: "List of expenses.",
    type: [ExpenseResponseDto],
  })
  @Get(":id/expenses")
  async getExpenses(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ExpenseResponseDto[]> {
    return await this.service.getExpenses(id);
  }
}
