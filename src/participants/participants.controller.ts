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
import { ParticipantsService } from "./participants.service";

@ApiTags("participants")
@Controller("participants")
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new participant" })
  @ApiResponse({
    status: 201,
    description: "The participant has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({ status: 200, description: "Return all participants." })
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a participant by id" })
  @ApiResponse({ status: 200, description: "Return the participant." })
  @ApiResponse({ status: 404, description: "Participant not found." })
  findOne(@Param("id") id: string) {
    return this.participantsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a participant" })
  @ApiResponse({
    status: 200,
    description: "The participant has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a participant" })
  @ApiResponse({
    status: 200,
    description: "The participant has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Participant not found." })
  remove(@Param("id") id: string) {
    return this.participantsService.remove(+id);
  }
}
