import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async getAllParticipants() {
    return this.databaseService.participant.findMany();
  }

  async createParticipant(data: Prisma.ParticipantCreateInput) {
    return this.databaseService.participant.create({
      data,
    });
  }
}
