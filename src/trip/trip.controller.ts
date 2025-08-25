import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripResponseDto } from "./dto/create-trip-response.dto";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@Controller("trip")
@ApiTags("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  private parseIntParam(value: string | undefined): number | undefined {
    if (value == null) {
      return undefined;
    }

    const parsed = Number.parseInt(value, 10);
    return parsed;
  }

  private parseOrderBy(orderBy: string | undefined) {
    if (orderBy !== undefined) {
      const [field, direction] = orderBy.split(":");

      return {
        [field]: direction.toLowerCase() || "asc",
      };
    }
  }

  @Post()
  @ApiOperation({
    summary: "Create a new trip",
    description: "Add a trip to which you can supply expenses and participants",
  })
  @ApiResponse({
    status: 201,
    description: "Trip created",
    type: CreateTripResponseDto,
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of trips",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips retrieved successfully",
    type: [CreateTripResponseDto],
  })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({
    name: "orderBy",
    required: false,
    description: "Order by field:direction [id:asc, name:desc]",
  })
  @ApiQuery({
    name: "include",
    required: false,
    description: "Include related data [participants, expenses]",
  })
  async findAll(
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @Query("orderBy") orderBy?: string,
    @Query("include") include?: string,
  ) {
    const includeOptions =
      include !== undefined && include.length > 0
        ? {
            participants: include.includes("participants"),
            expenses: include.includes("expenses"),
          }
        : undefined;

    return this.tripService.findAll({
      skip: this.parseIntParam(skip),
      take: this.parseIntParam(take),
      orderBy: this.parseOrderBy(orderBy),
      include: includeOptions,
    });
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrieve information about a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip details retrieved successfully",
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
    summary: "Update trip details",
    description: "Change information for an existing trip",
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
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a trip",
    description: "Remove a trip and its data",
  })
  @ApiResponse({
    status: 200,
    description: "Trip deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }

  @Get("participant/:participantId")
  @ApiOperation({
    summary: "Get trips by participant",
    description: "Retrieve trips connected with a participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant trips retrieved successfully",
  })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({
    name: "orderBy",
    required: false,
    description: "Order by field:direction [id:asc, name:desc]",
  })
  @ApiQuery({
    name: "include",
    required: false,
    description: "Include related data [participants, expenses]",
  })
  async getTripsByParticipant(
    @Param("participantId", ParseIntPipe) participantId: number,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @Query("orderBy") orderBy?: string,
    @Query("include") include?: string,
  ) {
    const includeOptions =
      include !== undefined && include.length > 0
        ? {
            participants: include.includes("participants"),
            expenses: include.includes("expenses"),
          }
        : undefined;

    return this.tripService.findTripsByParticipant(participantId, {
      skip: this.parseIntParam(skip),
      take: this.parseIntParam(take),
      orderBy: this.parseOrderBy(orderBy),
      include: includeOptions,
    });
  }

  @Post(":tripId/participants/:participantId")
  @ApiOperation({
    summary: "Add trip to participant",
    description: "connect a trip with a participant",
  })
  @ApiResponse({
    status: 200,
    description: "Trip added to participant successfully",
  })
  async addTripToParticipant(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Param("participantId", ParseIntPipe) participantId: number,
  ) {
    return this.tripService.addTripToParticipant(tripId, participantId);
  }

  @Delete(":tripId/participants/:participantId")
  @ApiOperation({
    summary: "Remove trip from participant",
    description: "Remove the connection between a trip and a participant",
  })
  @ApiResponse({
    status: 200,
    description: "Trip removed from participant successfully",
  })
  async removeTripFromParticipant(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Param("participantId", ParseIntPipe) participantId: number,
  ) {
    return this.tripService.removeTripFromParticipant(tripId, participantId);
  }

  @Post(":tripId/expenses/:expenseId")
  @ApiOperation({
    summary: "Add trip to expense",
    description: "connect a trip with an expense",
  })
  @ApiResponse({
    status: 200,
    description: "Trip added to expense successfully",
  })
  async addTripToExpense(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Param("expenseId", ParseIntPipe) expenseId: number,
  ) {
    return this.tripService.addTripToExpense(tripId, expenseId);
  }

  @Delete(":tripId/expenses/:expenseId")
  @ApiOperation({
    summary: "Remove trip from expense",
    description: "Remove the connection between a trip and an expense",
  })
  @ApiResponse({
    status: 200,
    description: "Trip removed from expense successfully",
  })
  async removeTripFromExpense(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Param("expenseId", ParseIntPipe) expenseId: number,
  ) {
    return this.tripService.removeTripFromExpense(tripId, expenseId);
  }
}
