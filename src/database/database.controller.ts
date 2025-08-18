import { account_type } from "@prisma/client";

import { Body, Controller, Get, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";
import { ParticipantService } from "./participant.service";

@Controller("database")
export class DatabaseController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly participantService: ParticipantService,
  ) {}

  @Get("feed")
  async getAllParticipants() {
    return this.participantService.getAllParticipants();
  }

  @Post("create")
  async createNewParticipant(
    @Body()
    participantData: {
      name: string;
      surname: string;
      account_type: account_type;
    },
  ) {
    return this.participantService.createParticipant(participantData);
  }
}
