import {
  Body,
  Controller,
  Delete,
  Get,
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
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({ status: 200, description: "List of participants retrieved" })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get participant by ID" })
  @ApiResponse({ status: 200, description: "Participant details retrieved" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update participant by ID" })
  @ApiResponse({ status: 200, description: "Participant updated successfully" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete participant by ID" })
  @ApiResponse({ status: 200, description: "Participant deleted successfully" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
