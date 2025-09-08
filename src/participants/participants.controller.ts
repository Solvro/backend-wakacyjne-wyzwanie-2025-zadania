import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantsService } from "./participants.service";

@ApiTags("participants")
@Controller("participants")
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new participant" })
  @ApiResponse({ status: 201, description: "Participant successfully created" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return await this.participantsService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({ status: 200, description: "List of all participants" })
  async findAll() {
    return await this.participantsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get participant by ID" })
  @ApiParam({ name: "id", description: "Participant ID" })
  @ApiResponse({ status: 200, description: "Participant found" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async findOne(@Param("id") id: string) {
    return await this.participantsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update participant by ID" })
  @ApiParam({ name: "id", description: "Participant ID" })
  @ApiResponse({ status: 200, description: "Participant updated" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return await this.participantsService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete participant by ID" })
  @ApiParam({ name: "id", description: "Participant ID" })
  @ApiResponse({ status: 200, description: "Participant deleted" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async remove(@Param("id") id: string) {
    await this.participantsService.remove(+id);
    return { message: "Participant deleted successfully" };
  }
}
