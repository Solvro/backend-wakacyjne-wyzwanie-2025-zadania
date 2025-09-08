import { AuthGuard } from "src/auth/auth.guard";
import type { RequestWithUser } from "src/auth/dto/request-with-user.dto";

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

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantResponseDto } from "./dto/participant-response.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("participants")
@ApiBearerAuth()
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new participant",
    description:
      "Adds a new participant and their personal information to the system",
  })
  @ApiResponse({
    status: 201,
    description: "Participant created successfully",
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  @UseGuards(AuthGuard)
  async create(
    @Body() createParticipantDto: CreateParticipantDto,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    if (user == null) {
      throw new Error("Authenticated user not found in request");
    }
    return this.participantService.create(createParticipantDto, user);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieves a list of all participants in the system",
  })
  @ApiResponse({
    status: 200,
    description: "List of participants retrieved successfully",
    type: [ParticipantResponseDto],
  })
  @UseGuards(AuthGuard)
  async findAll(@Req() request: RequestWithUser) {
    const user = request.user;
    if (user == null) {
      throw new Error("Authenticated user not found in request");
    }
    return this.participantService.findAll(user);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a participant by ID",
    description:
      "Retrieves participant's personal information by their unique ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant retrieved successfully",
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @UseGuards(AuthGuard)
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    if (user == null) {
      throw new Error("Authenticated user not found in request");
    }
    return this.participantService.findOne(id, user);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a participant by ID",
    description:
      "Updates participant's personal information by their unique ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully",
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @UseGuards(AuthGuard)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    if (user == null) {
      throw new Error("Authenticated user not found in request");
    }
    return this.participantService.update(id, updateParticipantDto, user);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a participant by ID",
    description:
      "Removes a participant and their personal information from the system by their unique ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @UseGuards(AuthGuard)
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    if (user == null) {
      throw new Error("Authenticated user not found in request");
    }
    return this.participantService.remove(id, user);
  }
}
