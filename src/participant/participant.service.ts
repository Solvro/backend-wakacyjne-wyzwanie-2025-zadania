import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

interface ParticipantOptions {
  where?: Prisma.ParticipantWhereInput;
  orderBy?: Prisma.ParticipantOrderByWithRelationInput;
  skip?: number;
  take?: number;
  include?: Prisma.ParticipantInclude;
}

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.database.participant.create({
      data: createParticipantDto,
    });
  }

  async findAll(options?: ParticipantOptions) {
    return this.database.participant.findMany({
      where: options?.where,
      orderBy: options?.orderBy,
      skip: options?.skip,
      take: options?.take,
      include: options?.include,
    });
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({ where: { id } });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.database.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({ where: { id } });
  }
}
