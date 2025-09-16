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

@ApiTags("participants")
@Controller("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: "Create a new participant" })
  @ApiResponse({ status: 201, description: "Participant created successfully" })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({ status: 200, description: "List of participants retrieved" })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get participant by ID" })
  @ApiResponse({ status: 200, description: "Participant details retrieved" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async findOne(@Param("id") id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update participant by ID" })
  @ApiResponse({ status: 200, description: "Participant updated successfully" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async update(
    @Param("id") id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete participant by ID" })
  @ApiResponse({ status: 204, description: "Participant deleted successfully" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async remove(@Param("id") id: number): Promise<void> {
    await this.participantService.remove(id);
  }
}
