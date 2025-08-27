import { ExpenseResponseDto } from "src/expense/dto/expense-response.dto";
import { PersonResponseDto } from "src/person/dto/person-response.dto";

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

import { CreateTripDto } from "./dto/create-trip.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("trip")
@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @ApiOperation({ summary: "Create a new trip" })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully.",
    type: TripResponseDto,
  })
  @Post()
  async create(@Body() dto: CreateTripDto): Promise<TripResponseDto> {
    return await this.tripService.create(dto);
  }

  @ApiOperation({ summary: "Get all trips" })
  @ApiResponse({
    status: 200,
    description: "List of all trips.",
    type: [TripResponseDto],
  })
  @Get()
  async findAll(): Promise<TripResponseDto[]> {
    return await this.tripService.findAll();
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
    return await this.tripService.findOne(id);
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
    return await this.tripService.update(id, dto);
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
    return await this.tripService.remove(id);
  }

  @ApiOperation({ summary: "Get all participants of a trip" })
  @ApiResponse({
    status: 200,
    description: "List of participants.",
    type: [PersonResponseDto],
  })
  @Get(":id/participants")
  async getParticipants(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PersonResponseDto[]> {
    return await this.tripService.getParticipants(id);
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
    return await this.tripService.getExpenses(id);
  }
}
