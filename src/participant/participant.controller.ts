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

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@ApiTags("participant")
@Controller("participant")
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
    type: CreateParticipantDto,
  })
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
    type: [CreateParticipantDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrieve a single participant using their ID",
  })
  @ApiResponse({
    status: 200,
    description: "Participant found",
    type: CreateParticipantDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update participant",
    description: "Update an existing participant by ID",
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
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
