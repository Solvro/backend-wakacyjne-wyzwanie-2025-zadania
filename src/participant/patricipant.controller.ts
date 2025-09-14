import { Participant } from "@prisma/client";

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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateParticipantDto } from "./create-participant.dto";
import { ParticipantService } from "./participant.service";
import { UpdateParticipantDto } from "./update-participant.dto";

@ApiTags("Participant")
@Controller("api/v1/participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({ status: 200, description: "List of participants" })
  async getAll() {
    return await this.participantService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a participant by ID" })
  @ApiParam({ name: "id", type: Number, description: "Participant ID" })
  @ApiResponse({ status: 200, description: "Participant found" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async getOne(@Param("id") id: string) {
    return await this.participantService.getOne(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new participant" })
  @ApiBody({ type: CreateParticipantDto })
  @ApiResponse({ status: 201, description: "Participant created" })
  async post(@Body() dto: CreateParticipantDto): Promise<Participant> {
    return await this.participantService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update existing participant" })
  @ApiBody({ type: UpdateParticipantDto })
  @ApiResponse({ status: 200, description: "Participant updated" })
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateParticipantDto,
  ): Promise<Participant> {
    return await this.participantService.update(Number(id), dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a participant by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the participant to delete",
  })
  @ApiResponse({ status: 200, description: "Participant deleted" })
  @ApiResponse({ status: 404, description: "Participant not found" })
  async delete(@Param("id") id: string) {
    await this.participantService.delete(Number(id));
  }
}
