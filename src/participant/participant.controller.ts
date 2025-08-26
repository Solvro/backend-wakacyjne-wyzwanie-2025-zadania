import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@ApiTags("Participants")
@Controller("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: "Tworzy nowego uczestnika wycieczki" })
  @ApiCreatedResponse({
    description: "Utworzono nowego uczestnika wycieczki",
    type: CreateParticipantDto,
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Zwraca listę wszystkich uczestników" })
  @ApiOkResponse({
    description: "Zwraca listę uczestników",
    type: [CreateParticipantDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Zwraca konkretnego uczestnika" })
  @ApiOkResponse({
    description: "Zwraca konkretnego uczestnika",
    type: CreateParticipantDto,
  })
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Aktualizuje konkretnego uczestnika" })
  @ApiOkResponse({
    description: "Zaktualizowano uczestnika",
    type: UpdateParticipantDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Usuwa konkretnego uczestnika" })
  @ApiNoContentResponse({ description: "Uczestnik został usunięty" })
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
