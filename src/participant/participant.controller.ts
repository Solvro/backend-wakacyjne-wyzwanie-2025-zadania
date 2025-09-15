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
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/roles.decorator";
import { RoleGuard } from "../auth/roles/roles.guard";
import { PaginationDto } from "../pagination/pagination.dto";
import { CreateParticipantResponseDto } from "./dto/create-participant-response.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantMetadata } from "./dto/participant-metadata.dto";
import { ParticipantUpdateResponseDto } from "./dto/participant-update-response.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@ApiTags("participants")
@Controller("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new participant",
    description: "Add participant",
  })
  @ApiResponse({
    status: 201,
    description: "Participant created",
    type: CreateParticipantResponseDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieve a list of all participants",
  })
  @ApiResponse({
    status: 200,
    description: "List of participants returned successfully",
    type: [CreateParticipantResponseDto],
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.participantService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrieve a single participant using their ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant found",
    type: CreateParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update participant",
    description: "Update an existing participant by ID",
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete participant",
    description: "Remove an existing participant by ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }

  @Patch("")
  @ApiOperation({
    summary: "Update personal info",
  })
  @ApiResponse({
    status: 200,
    description: "User updated",
  })
  @UseGuards(AuthGuard)
  async updateParticipantData(
    @Request() request: { participant: ParticipantMetadata },
    @Body() updateRequest: UpdateParticipantDto,
  ): Promise<ParticipantUpdateResponseDto> {
    const targetEmail =
      request.participant.role === "Admin"
        ? (updateRequest.email ?? request.participant.email)
        : request.participant.email;
    return this.participantService.updateParticipantData(
      targetEmail,
      updateRequest.name,
    );
  }
}
