import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { TripsService } from "../trips/trips.service";
import { ParticipantDto } from "./dto/participant.dto";
import { ParticipantsService } from "./participants.service";

@ApiTags("participants")
@Controller("trips/:tripId/participants")
export class ParticipantsController {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly tripsService: TripsService,
  ) {}

  // GET /trips/:tripId/participants - Get all participants for a trip
  @Get()
  @ApiOperation({
    summary: "Get trip participants",
    description: "Get all participants for a specific trip",
  })
  @ApiParam({ name: "tripId", description: "Trip ID", type: "number" })
  @ApiOkResponse({
    description: "List of trip participants retrieved successfully",
    example: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+48123456789",
        isOrganizer: false,
        tripId: 1,
        createdAt: "2025-08-24T10:00:00Z",
        updatedAt: "2025-08-24T10:00:00Z",
      },
    ],
  })
  async getTripParticipants(@Param("tripId", ParseIntPipe) tripId: number) {
    return this.tripsService.getTripParticipants(tripId);
  }

  // POST /trips/:tripId/participants - Add participant to trip
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Add participant to trip",
    description: "Add a new participant to a specific trip",
  })
  @ApiParam({ name: "tripId", description: "Trip ID", type: "number" })
  @ApiBody({
    type: ParticipantDto,
    description: "Participant creation data",
    examples: {
      example1: {
        summary: "Regular participant",
        value: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+48123456789",
          isOrganizer: false,
        },
      },
      example2: {
        summary: "Trip organizer",
        value: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          isOrganizer: true,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: "Participant added to trip successfully",
    example: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+48123456789",
      isOrganizer: false,
      tripId: 1,
      createdAt: "2025-08-24T10:00:00Z",
      updatedAt: "2025-08-24T10:00:00Z",
    },
  })
  async addParticipant(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Body() createParticipantDto: ParticipantDto,
  ) {
    return this.participantsService.addParticipantToTrip(
      tripId,
      createParticipantDto,
    );
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update participant",
    description: "Update an existing participant",
  })
  @ApiParam({ name: "id", description: "Participant ID", type: "number" })
  @ApiBody({
    type: ParticipantDto,
    description: "Participant update data",
  })
  @ApiOkResponse({
    description: "Participant updated successfully",
    type: ParticipantDto,
  })
  async updateParticipant(
    @Param("id", ParseIntPipe) participantId: number,
    @Body() updateParticipantDto: ParticipantDto,
  ) {
    return this.participantsService.updateParticipant(
      participantId,
      updateParticipantDto,
    );
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete participant",
    description: "Delete an existing participant",
  })
  @ApiParam({ name: "id", description: "Participant ID", type: "number" })
  @ApiOkResponse({
    description: "Participant deleted successfully",
  })
  async deleteParticipant(@Param("id", ParseIntPipe) participantId: number) {
    return this.participantsService.deleteParticipant(participantId);
  }
}
