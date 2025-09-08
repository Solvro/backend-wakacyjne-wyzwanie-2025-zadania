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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: "Create a new participant" })
  @ApiResponse({
    status: 201,
    description: "Participant created successfully.",
    type: CreateParticipantDto,
  })
  @ApiResponse({ status: 404, description: "Trip not found." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({
    status: 200,
    description: "Participants retrieved successfully.",
    type: [CreateParticipantDto],
  })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a participant by ID" })
  @ApiResponse({
    status: 200,
    description: "Participant retrieved successfully.",
    type: CreateParticipantDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a participant by ID" })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully.",
    type: CreateParticipantDto,
  })
  @ApiResponse({ status: 404, description: "Participant or Trip not found." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a participant by ID" })
  @ApiResponse({
    status: 200,
    description: "Participant deleted successfully.",
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
