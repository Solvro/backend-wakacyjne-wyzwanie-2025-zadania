import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantResponseDto } from "./dto/participant-response.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantEntity } from "./entities/participant.entity";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("Participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: "Creates a new participant" })
  @ApiResponse({
    status: 201,
    description: "The participant has been successfully created.",
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Not Found. The specified trip does not exist.",
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all participants" })
  @ApiResponse({
    status: 200,
    description: "A list of all participants.",
    type: [ParticipantEntity],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single participant by ID" })
  @ApiParam({
    name: "id",
    description: "The ID of the participant to retrieve",
  })
  @ApiResponse({
    status: 200,
    description: "The requested participant.",
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing participant" })
  @ApiParam({ name: "id", description: "The ID of the participant to update" })
  @ApiBody({ type: UpdateParticipantDto })
  @ApiResponse({
    status: 200,
    description: "The participant has been successfully updated.",
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a participant" })
  @ApiParam({ name: "id", description: "The ID of the participant to delete" })
  @ApiResponse({
    status: 200,
    description: "The participant has been successfully deleted.",
    type: ParticipantEntity,
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
