import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripParticipantDto } from "./dto/create-trip-participant.dto";
import { TripParticipantResponseDto } from "./dto/trip-participant-response.dto";
import { TripParticipantsService } from "./trip-participants.service";

@Controller("trip-participants")
@ApiTags("trip-participants")
export class TripParticipantsController {
  constructor(
    private readonly tripParticipantsService: TripParticipantsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Add a participant to a trip",
    description: "Adds a specified participant to a specified trip.",
  })
  @ApiResponse({
    status: 201,
    description: "Participant added successfully.",
    type: TripParticipantResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: 404,
    description: "Trip or participant not found",
  })
  @ApiResponse({
    status: 409,
    description: "Trip participant already exists",
  })
  async create(@Body() createTripParticipantDto: CreateTripParticipantDto) {
    return this.tripParticipantsService.create(createTripParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get participants for all trips",
    description: "Retrieves a list of all participants for all trips.",
  })
  @ApiResponse({
    status: 200,
    description: "List of participants retrieved successfully.",
    type: [TripParticipantResponseDto],
  })
  async findAll() {
    return this.tripParticipantsService.findAll();
  }

  @Get("trip/:id")
  @ApiOperation({
    summary: "Get participants of specified trip",
    description:
      "Retrieves a list of all participants and their details for a specified trip.",
  })
  @ApiResponse({
    status: 200,
    description:
      "List of participants for the specified trip retrieved successfully.",
    type: [TripParticipantResponseDto],
  })
  async findParticipantsOfTrip(@Param("id") id: string) {
    return this.tripParticipantsService.findParticipantsOfTrip(+id);
  }

  @Get("participant/:id")
  @ApiOperation({
    summary: "Get trips attended by a specified participant",
    description:
      "Retrieves a list of all trips attended by a specified participant and their details.",
  })
  @ApiResponse({
    status: 200,
    description:
      "List of trips for the specified participant retrieved successfully.",
    type: [TripParticipantResponseDto],
  })
  async findTripsByParticipant(@Param("id") id: string) {
    return this.tripParticipantsService.findTripsByParticipant(+id);
  }

  @Delete(":tripId/:participantId")
  @ApiOperation({
    summary: "Remove a participant from a trip",
    description: "Removes a specified participant from a specified trip.",
  })
  @ApiResponse({
    status: 200,
    description: "Participant removed successfully.",
  })
  @ApiResponse({
    status: 404,
    description: "Trip participant not found",
  })
  async remove(
    @Param("tripId") tripId: string,
    @Param("participantId") participantId: string,
  ) {
    return this.tripParticipantsService.remove(+tripId, +participantId);
  }

  @Delete("participant/:id")
  @ApiOperation({
    summary: "Remove a participant from all trips",
    description: "Removes the specified participant from all trips.",
  })
  @ApiResponse({
    status: 200,
    description: "Participant removed from all trips successfully.",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async removeParticipantFromAllTrips(@Param("id") participantId: string) {
    return this.tripParticipantsService.removeParticipantFromAllTrips(
      +participantId,
    );
  }

  @Delete("trip/:id")
  @ApiOperation({
    summary: "Remove all participants from a trip",
    description: "Removes all participants from the specified trip.",
  })
  @ApiResponse({
    status: 200,
    description: "All participants removed from the trip successfully.",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async removeAllParticipantsFromTrip(@Param("id") tripId: string) {
    return this.tripParticipantsService.removeAllParticipantsFromTrip(+tripId);
  }
}
