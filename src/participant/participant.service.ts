import { Participant } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./create-participant.dto";
import { UpdateParticipantDto } from "./update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Participant[]> {
    return this.databaseService.participant.findMany();
  }

  async getOne(id: number): Promise<Participant | null> {
    return this.databaseService.participant.findUnique({
      where: {
        id,
      },
    });
  }

  async create(dto: CreateParticipantDto): Promise<Participant> {
    return this.databaseService.participant.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role,
      },
    });
  }

  async update(id: number, dto: UpdateParticipantDto): Promise<Participant> {
    return this.databaseService.participant.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number): Promise<void> {
    const participant = await this.databaseService.participant.findUnique({
      where: { id },
    });

    if (participant === null) {
      throw new NotFoundException("Participant not found");
    }

    await this.databaseService.participant.delete({
      where: { id },
    });
  }
}
