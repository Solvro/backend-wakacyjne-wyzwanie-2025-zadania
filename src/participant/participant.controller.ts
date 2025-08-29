import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/role.decorator";
import { RoleGuard } from "src/auth/roles/role.guard";

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

import { CreateParticipantResponseDto } from "./dto/create-participant-respone.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new participant",
    description: "Add a participant to a specific trip",
  })
  @ApiResponse({
    status: 201,
    description: "Participant created successfully",
    type: CreateParticipantResponseDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIPCORD)
  @ApiBearerAuth("access-token")
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieve a list of all participants",
  })
  @ApiResponse({
    status: 200,
    description: "List of participants retrieved successfully",
    type: [CreateParticipantDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get a participant by ID",
    description: "Retrieve details of a specific participant using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant details retrieved successfully",
    type: CreateParticipantResponseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update a participant",
    description: "Modify details of an existing participant using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully",
    type: UpdateParticipantDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIPCORD)
  @ApiBearerAuth("access-token")
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete a participant",
    description: "Remove a participant using its ID",
  })
  @ApiResponse({
    status: 204,
    description: "Participant deleted successfully",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIPCORD)
  @ApiBearerAuth("access-token")
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
