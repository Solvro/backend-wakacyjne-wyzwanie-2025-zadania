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
import { GetParticipantDto } from "./dto/get-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: "Add new participant",
    description: "Add a new participant that can be assigned to trips",
  })
  @ApiResponse({
    status: 201,
    description: "Participant added",
    type: GetParticipantDto,
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Get a full list of all participants in a system",
  })
  @ApiResponse({
    status: 200,
    description: "List of participants retrieved",
    type: [GetParticipantDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get participant by Id",
    description: "Get details of a participant with a given Id",
  })
  @ApiResponse({
    status: 200,
    description: "Participant retrieved",
    type: GetParticipantDto,
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
    summary: "Update participant by Id",
    description: "Update details of a participant with a given Id",
  })
  @ApiResponse({
    status: 200,
    description: "Participant details updated",
    type: GetParticipantDto,
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
    summary: "Remove participant by Id",
    description: "Remove data of a participant with a given Id",
  })
  @ApiResponse({
    status: 200,
    description: "Participant deleted",
    type: GetParticipantDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
