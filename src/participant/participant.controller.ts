import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantResponseDto } from "./dto/participant-response.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@ApiTags("participant")
@Controller("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @ApiOperation({ summary: "Create a new participant" })
  @ApiResponse({
    status: 201,
    description: "Participant created successfully.",
    type: ParticipantResponseDto,
  })
  @Post()
  async create(
    @Body() dto: CreateParticipantDto,
  ): Promise<ParticipantResponseDto> {
    return await this.participantService.create(dto);
  }

  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({
    status: 200,
    description: "List of all participants.",
    type: [ParticipantResponseDto],
  })
  @Get()
  async findAll(): Promise<ParticipantResponseDto[]> {
    return await this.participantService.findAll();
  }

  @ApiOperation({ summary: "Get participant by ID" })
  @ApiResponse({
    status: 200,
    description: "Participant found.",
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ParticipantResponseDto | null> {
    return await this.participantService.findOne(id);
  }

  @ApiOperation({ summary: "Update participant by ID" })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully.",
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateParticipantDto,
  ): Promise<ParticipantResponseDto> {
    return await this.participantService.update(id, dto);
  }

  @ApiOperation({ summary: "Delete participant by ID" })
  @ApiResponse({
    status: 200,
    description: "Participant deleted.",
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ParticipantResponseDto> {
    return await this.participantService.remove(id);
  }
}
