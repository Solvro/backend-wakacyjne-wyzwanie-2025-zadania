import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@ApiTags("participants")
@Controller("participants")
export class ParticipantController {
  constructor(private readonly service: ParticipantService) {}

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiOkResponse({ description: "List all participants" })
  async findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get specific participant" })
  @ApiOkResponse({ description: "Get one participant" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a participant" })
  @ApiCreatedResponse({ description: "Created participant" })
  async create(@Body() dto: CreateParticipantDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "Updated participant" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateParticipantDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "Deleted participant" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
