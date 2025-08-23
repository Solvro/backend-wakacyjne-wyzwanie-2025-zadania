import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

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
