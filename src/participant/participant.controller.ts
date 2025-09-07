import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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
    description: "Add a participant to a specific trip",
  })
  @ApiResponse({
    status: 201,
    description: "Participant created successfully",
    type: CreateParticipantDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieve a list of all participants across all trips",
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
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrieve detailed information about a specific participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant details retrieved successfully",
    type: CreateParticipantDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update participant details",
    description: "Modify information for an existing participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully",
    type: CreateParticipantDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a participant",
    description: "Remove a participant from a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Participant deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
