import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantMetadata } from "./dto/participant-metadata.dto";
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
  @ApiResponse({
    status: 209,
    description: "Participant with this email address already exists",
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
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch("")
  @ApiOperation({
    summary: "Updates a particpant",
    description:
      "Admins can modify any user by supplying their id in request body, while users and coordinators can only modify themselves.",
  })
  @ApiResponse({
    status: 200,
    description: "Patch successful",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async update(
    @Request()
    request: {
      participant: ParticipantMetadata;
    },
    @Body() updateRequest: UpdateParticipantDto,
  ) {
    if (request.participant.role === "ADMIN") {
      return await this.participantService.updateAny(updateRequest);
    }
    return await this.participantService.updateSelf(
      request.participant.id,
      updateRequest,
    );
  }

  @UseGuards(AuthGuard)
  @Delete("")
  @ApiOperation({
    summary: "Deletes a participant",
    description: "Given an id, deletes a participant record with that id",
  })
  @ApiResponse({
    status: 200,
    description: "Resource deleted",
  })
  async remove(
    @Request()
    request: {
      participant: ParticipantMetadata;
    },
    @Body() body: { id: number },
  ) {
    if (request.participant.role === "ADMIN") {
      return await this.participantService.deleteAny(body.id);
    }
    return await this.participantService.deleteSelf(
      body.id,
      request.participant.id,
    );
  }
}
