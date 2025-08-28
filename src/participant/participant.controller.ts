import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
