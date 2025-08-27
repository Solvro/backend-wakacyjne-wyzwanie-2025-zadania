import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantResponseDto } from "./dto/participant-response.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateParticipantDto): Promise<ParticipantResponseDto> {
    return await this.prisma.participant.create({ data: dto });
  }

  async findAll(): Promise<ParticipantResponseDto[]> {
    return await this.prisma.participant.findMany();
  }

  async findOne(id: number): Promise<ParticipantResponseDto | null> {
    return await this.prisma.participant.findUnique({ where: { id } });
  }

  async update(
    id: number,
    dto: UpdateParticipantDto,
  ): Promise<ParticipantResponseDto> {
    return await this.prisma.participant.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<ParticipantResponseDto> {
    return await this.prisma.participant.delete({ where: { id } });
  }
}
