import { Role } from "@prisma/client";
import { Roles } from "src/auth/roles/roles.decorator";
import { RoleGuard } from "src/auth/roles/roles.guard";

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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { CreateParticipantResponseDto } from "./dto/create-participant-response.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth("access-token")
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a participant",
    description:
      "Add a participant to which you can add new trips and expenses",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Participant created",
    type: CreateParticipantResponseDto,
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieve a list of all participants in the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of participants retrieved successfully",
    type: [CreateParticipantResponseDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrieve detailed information about a specific participant",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Participant details retrieved successfully",
    type: CreateParticipantResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Participant not found",
  })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Update participant details",
    description: "Modify information for an existing participant",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Participant updated successfully",
    type: CreateParticipantResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Participant not found",
  })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Delete a participant",
    description:
      "Remove a participant and all its associated data from the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Participant deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Participant not found",
  })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
