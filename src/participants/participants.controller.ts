import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantResponseDto } from "./dto/participant-response.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantsService } from "./participants.service";

@ApiTags("participants")
@Controller("participants")
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: "Stwórz nowego uczestnika" })
  @ApiCreatedResponse({
    description: "Uczestnik utworzony",
    type: ParticipantResponseDto,
  })
  @ApiBadRequestResponse({ description: "Nieprawidłowe dane" })
  async create(@Body() dto: CreateParticipantDto) {
    return this.participantsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Pobierz listę wszystkich uczestników" })
  @ApiOkResponse({
    description: "Zwraca listę uczestników",
    type: ParticipantResponseDto,
    isArray: true,
  })
  async findAll() {
    return this.participantsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Pobierz uczestnika po ID" })
  @ApiOkResponse({
    description: "Zwraca uczestnika",
    type: ParticipantResponseDto,
  })
  @ApiNotFoundResponse({ description: "Uczestnik nie istnieje." })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.participantsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Zaktualizuj uczestnika" })
  @ApiOkResponse({
    description: "Uczestnik zaktualizowany.",
    type: ParticipantResponseDto,
  })
  @ApiNotFoundResponse({ description: "Uczestnik nie istnieje." })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Usuń uczestnika" })
  @ApiNoContentResponse({ description: "Uczestnik usunięty." })
  @ApiNotFoundResponse({ description: "Uczestnik nie istnieje." })
  @HttpCode(204)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.participantsService.remove(id);
  }
}
