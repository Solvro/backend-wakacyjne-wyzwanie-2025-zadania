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

@Controller("participant")
@ApiTags("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: "Creates a new participant",
    description:
      "Adds a new participant, you need to supply a name, surname and an account type (enum)",
  })
  @ApiResponse({
    status: 201,
    description: "participant created",
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Returns all participants",
    description: "Returns all participants",
  })
  @ApiResponse({
    status: 200,
    description: "Request successful",
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Returns a participant with given id",
    description: "Given an id, returns a participant record with that id",
  })
  @ApiResponse({
    status: 200,
    description: "Request successful",
  })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Updates a particpant",
    description: "Given an id, updates that record with the given data",
  })
  @ApiResponse({
    status: 200,
    description: "Patch successful",
  })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deletes a participant with given id",
    description: "Given an id, deletes a participant record with that id",
  })
  @ApiResponse({
    status: 200,
    description: "Resource deleted",
  })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
