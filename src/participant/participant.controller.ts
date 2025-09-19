import { Role } from "@prisma/client";

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
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Public, Roles } from "../auth/roles";
import { RolesGuard } from "../auth/roles.guard";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new participant",
    description: "Add a participant that can be assigned to trips and expenses",
  })
  @ApiResponse({
    status: 201,
    description: "Participant created",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieve a list of all participants in the system",
  })
  @ApiResponse({
    status: 200,
    description: "List of participants retrieved successfully",
  })
  @Public()
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrieve detailed information about a specific participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant details retrieved successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @Public()
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update participant details",
    description: "Modify information for an existing participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a participant",
    description:
      "Remove a participant and all its associated data from the system",
  })
  @ApiResponse({
    status: 200,
    description: "Participant deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
