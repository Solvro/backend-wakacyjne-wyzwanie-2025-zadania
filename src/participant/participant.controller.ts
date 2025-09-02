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

import { CreateParticipantResponseDto } from "./dto/create-participant-response.dto";
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
    summary: "Create participant",
    description: "Creates a new participant",
  })
  @ApiResponse({
    status: 201,
    description: "The participant has been successfully created.",
    type: CreateParticipantResponseDto,
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieves a list of all participants",
  })
  @ApiResponse({
    status: 200,
    description: "The list of participants has been successfully retrieved.",
    type: [CreateParticipantResponseDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrieves a participant by their ID",
  })
  @ApiResponse({
    status: 200,
    description: "The participant has been successfully retrieved.",
    type: CreateParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update participant by ID",
    description: "Updates a participant by their ID",
  })
  @ApiResponse({
    status: 200,
    description: "The participant has been successfully updated.",
    type: UpdateParticipantDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete participant by ID",
    description: "Deletes a participant by their ID",
  })
  @ApiResponse({
    status: 204,
    description: "The participant has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
