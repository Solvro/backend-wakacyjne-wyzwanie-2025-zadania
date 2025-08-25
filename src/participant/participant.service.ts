import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async getAllParticipants() {
    return this.database.participant.findMany();
  }

  async createNewParticipant(data: Prisma.ParticipantCreateInput) {
    return this.database.participant.create({
      data,
    });
  }
}
