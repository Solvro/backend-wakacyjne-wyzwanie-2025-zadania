import { Role } from "@prisma/client";

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
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import type { RequestWithUser } from "../auth/dto/request-with-user.dto";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { CreateTripParticipantDto } from "./dto/create-trip-participant.dto";
import { TripParticipantResponseDto } from "./dto/trip-participant-response.dto";
import { TripParticipantsService } from "./trip-participants.service";

@Controller("trip-participants")
@ApiTags("trip-participants")
@ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  async create(
    @Body() createTripParticipantDto: CreateTripParticipantDto,
    @Req() request: RequestWithUser,
  ) {
    if (request.user == null) {
      throw new UnauthorizedException(
        "Authenticated user not found in request.",
      );
    }
    return this.tripParticipantsService.create(
      createTripParticipantDto,
      request.user,
    );
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
  @UseGuards(AuthGuard)
  async findAll(@Req() request: RequestWithUser) {
    if (request.user == null) {
      throw new UnauthorizedException(
        "Authenticated user not found in request.",
      );
    }
    return this.tripParticipantsService.findAll(request.user);
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
  @UseGuards(AuthGuard)
  async findParticipantsOfTrip(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: RequestWithUser,
  ) {
    if (request.user == null) {
      throw new UnauthorizedException(
        "Authenticated user not found in request.",
      );
    }
    return this.tripParticipantsService.findParticipantsOfTrip(
      id,
      request.user,
    );
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
  @UseGuards(AuthGuard)
  async findTripsByParticipant(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: RequestWithUser,
  ) {
    if (request.user == null) {
      throw new UnauthorizedException(
        "Authenticated user not found in request.",
      );
    }
    return this.tripParticipantsService.findTripsByParticipant(
      id,
      request.user,
    );
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
  @UseGuards(AuthGuard)
  async remove(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Param("participantId", ParseIntPipe) participantId: number,
    @Req() request: RequestWithUser,
  ) {
    if (request.user == null) {
      throw new UnauthorizedException(
        "Authenticated user not found in request.",
      );
    }
    return this.tripParticipantsService.remove(
      tripId,
      participantId,
      request.user,
    );
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async removeParticipantFromAllTrips(
    @Param("id", ParseIntPipe) participantId: number,
  ) {
    return this.tripParticipantsService.removeParticipantFromAllTrips(
      participantId,
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async removeAllParticipantsFromTrip(
    @Param("id", ParseIntPipe) tripId: number,
  ) {
    return this.tripParticipantsService.removeAllParticipantsFromTrip(tripId);
  }
}
