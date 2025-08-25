import { AccountType } from "@prisma/client";

import { Body, Controller, Get, Post } from "@nestjs/common";

import { ParticipantService } from "./participant.service";

@Controller("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  async getAllParticipants() {
    return this.participantService.getAllParticipants();
  }

  @Post()
  async createNewParticipant(
    @Body()
    participantData: {
      name: string;
      surname: string;
      account_type: AccountType;
    },
  ) {
    return this.participantService.createNewParticipant(participantData);
  }
}
