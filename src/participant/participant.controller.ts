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
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { Public } from "../common/decorators/public.decorator";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@ApiTags("participants")
@Controller("participants")
export class ParticipantController {
  constructor(private readonly service: ParticipantService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Get all participants" })
  @ApiOkResponse({ description: "List all participants" })
  @ApiBadRequestResponse({ description: "Invalid query" })
  async findAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Get specific participant" })
  @ApiOkResponse({ description: "Get one participant" })
  @ApiNotFoundResponse({ description: "participant not found" })
  @ApiBadRequestResponse({ description: "Invalid query" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a participant" })
  @ApiCreatedResponse({ description: "Created participant" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async create(@Body() dto: CreateParticipantDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update participant" })
  @ApiOkResponse({ description: "Updated participant" })
  @ApiNotFoundResponse({ description: "participant not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateParticipantDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete participant" })
  @ApiOkResponse({ description: "Deleted participant" })
  @ApiNotFoundResponse({ description: "participant not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
