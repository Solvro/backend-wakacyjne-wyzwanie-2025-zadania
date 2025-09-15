import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    // Dla uczestników dodawanych przez organizatora generujemy tymczasowe hasło
    const tempPassword = Math.random().toString(36).slice(-8);
    return this.prisma.user.create({
      data: {
        ...createParticipantDto,
        password: tempPassword, // Tymczasowe hasło - uczestnik będzie mógł je zmienić
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        // Nie zwracamy hasła w odpowiedzi
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        // Nie zwracamy hasła w odpowiedzi
      },
    });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateParticipantDto,
      select: {
        id: true,
        name: true,
        email: true,
        // Nie zwracamy hasła w odpowiedzi
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
