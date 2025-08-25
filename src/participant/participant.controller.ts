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

import { CreateParticipantResponseDto } from "./dto/create-participant-response.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

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
    summary: "Create a new participant",
    description: "Add a participant to which you can supply expenses and trips",
  })
  @ApiResponse({
    status: 201,
    description: "Participant created",
    type: CreateParticipantResponseDto,
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieve a list of participants",
  })
  @ApiResponse({
    status: 200,
    description: "List of participants retrieved successfully",
    type: [CreateParticipantResponseDto],
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
    description: "Include related data [trips, expenses]",
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
            trips: include.includes("trips"),
            expenses: include.includes("expenses"),
          }
        : undefined;

    return this.participantService.findAll({
      skip: this.parseIntParam(skip),
      take: this.parseIntParam(take),
      orderBy: this.parseOrderBy(orderBy),
      include: includeOptions,
    });
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrieve detailed information about a participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant details retrieved successfully",
    type: CreateParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update participant details",
    description: "Change information for an existing participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully",
    type: CreateParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a participant",
    description: "Remove a participant and its data",
  })
  @ApiResponse({
    status: 200,
    description: "Participant deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }

  @Get("trip/:tripId")
  @ApiOperation({
    summary: "Get participants by trip",
    description: "Retrieve participants connected with a specific trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip participants retrieved successfully",
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
    description: "Include related data [trips, expenses]",
  })
  async getParticipantsByTrip(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @Query("orderBy") orderBy?: string,
    @Query("include") include?: string,
  ) {
    const includeOptions =
      include !== undefined && include.length > 0
        ? {
            trips: include.includes("trips"),
            expenses: include.includes("expenses"),
          }
        : undefined;

    return this.participantService.findParticipantsByTrip(tripId, {
      skip: this.parseIntParam(skip),
      take: this.parseIntParam(take),
      orderBy: this.parseOrderBy(orderBy),
      include: includeOptions,
    });
  }

  @Post(":participantId/trips/:tripId")
  @ApiOperation({
    summary: "Add participant to trip",
    description: "Connect a participant with a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Participant added to trip successfully",
  })
  async addParticipantToTrip(
    @Param("participantId", ParseIntPipe) participantId: number,
    @Param("tripId", ParseIntPipe) tripId: number,
  ) {
    return this.participantService.addParticipantToTrip(participantId, tripId);
  }

  @Delete(":participantId/trips/:tripId")
  @ApiOperation({
    summary: "Remove participant from trip",
    description: "Remove the connection between a participant and a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Participant removed from trip successfully",
  })
  async removeParticipantFromTrip(
    @Param("participantId", ParseIntPipe) participantId: number,
    @Param("tripId", ParseIntPipe) tripId: number,
  ) {
    return this.participantService.removeParticipantFromTrip(
      participantId,
      tripId,
    );
  }

  @Post(":participantId/expenses/:expenseId")
  @ApiOperation({
    summary: "Add participant to expense",
    description: "connect a participant with an expense",
  })
  @ApiResponse({
    status: 200,
    description: "Participant added to expense successfully",
  })
  async addParticipantToExpense(
    @Param("participantId", ParseIntPipe) participantId: number,
    @Param("expenseId", ParseIntPipe) expenseId: number,
  ) {
    return this.participantService.addParticipantToExpense(
      participantId,
      expenseId,
    );
  }

  @Delete(":participantId/expenses/:expenseId")
  @ApiOperation({
    summary: "Remove participant from expense",
    description: "Remove the connection between a participant and an expense",
  })
  @ApiResponse({
    status: 200,
    description: "Participant removed from expense successfully",
  })
  async removeParticipantFromExpense(
    @Param("participantId", ParseIntPipe) participantId: number,
    @Param("expenseId", ParseIntPipe) expenseId: number,
  ) {
    return this.participantService.removeParticipantFromExpense(
      participantId,
      expenseId,
    );
  }
}
