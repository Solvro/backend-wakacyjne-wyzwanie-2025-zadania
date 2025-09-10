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
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripParticipantDto } from "./dto/create-trip-participant.dto";
import { UpdateTripParticipantDto } from "./dto/update-trip-participant.dto";
import { TripParticipantService } from "./trip-participant.service";

@Controller("trip-participant")
@ApiTags("trip-participants")
export class TripParticipantController {
  constructor(
    private readonly tripParticipantService: TripParticipantService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Add a new participant to specific trip",
    description:
      "Add a participant to a specific trip, enabling them to be part of the trip's expenses",
  })
  @ApiResponse({
    status: 201,
    description: "Participant added to trip",
  })
  async create(@Body() createTripParticipantDto: CreateTripParticipantDto) {
    return this.tripParticipantService.create(createTripParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants in trips",
    description: "Retrieve a list of all trips participants in the system",
  })
  @ApiResponse({
    status: 200,
    description: "List of trips participants retrieved successfully",
  })
  async findAll() {
    return this.tripParticipantService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get trip participant by ID",
    description:
      "Retrieve detailed information about a specific participant in specific trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip participant details retrieved successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Trip participant not found",
  })
  async findOne(@Param("id") id: string) {
    return this.tripParticipantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update trip participant details",
    description: "Modify information for an existing participant of a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip participant updated successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Trip participant not found",
  })
  async update(
    @Param("id") id: string,
    @Body() updateTripParticipantDto: UpdateTripParticipantDto,
  ) {
    return this.tripParticipantService.update(+id, updateTripParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a trip participant",
    description:
      "Remove a trip participant and all its associated data from the system",
  })
  @ApiResponse({
    status: 200,
    description: "Trip participant deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Trip participant not found",
  })
  async remove(@Param("id") id: string) {
    return this.tripParticipantService.remove(+id);
  }
}
