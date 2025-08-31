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
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Created a new participant",
    description: "Added a participant",
  })
  @ApiResponse({
    status: 201,
    description: "Participant created",
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Returning all participants",
    description: "Returned all participants!",
  })
  @ApiResponse({
    status: 201,
    description: "Participants returned",
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Returned a participant with given id",
    description: "Returned a participant with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Participants returned!",
  })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Updated a participant with given id",
    description: "Updated a participant with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Participant updated!",
  })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Deleted a participant with given id",
    description: "Deleted a participant with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Participant deleted!",
  })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
