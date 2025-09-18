import { Participant, Prisma } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateParticipantDto): Promise<Participant> {
    const { tripId, ...rest } = dto;

    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      select: { id: true },
    });
    if (trip === null) {
      throw new NotFoundException(
        `Nie odnaleziono wycieczki o numerze ${String(tripId)}`,
      );
    }

    try {
      return await this.prisma.participant.create({
        data: {
          ...rest,
          trip: { connect: { id: tripId } },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(
          `Nie znaleziono wycieczki o numerze ${String(tripId)}`,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Participant[]> {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
    });
    if (participant == null) {
      throw new NotFoundException(
        `Nie znaleziono wycieczkowicza o numerze ${String(id)}`,
      );
    }
    return participant;
  }

  async update(id: number, dto: UpdateParticipantDto): Promise<Participant> {
    await this.findOne(id);

    const { tripId, ...rest } = dto as UpdateParticipantDto & {
      tripId?: number;
    };

    if (tripId != null) {
      const trip = await this.prisma.trip.findUnique({
        where: { id: tripId },
        select: { id: true },
      });
      if (trip === null) {
        throw new NotFoundException(
          `Nie znaleziono wycieczki o numerze ${String(tripId)}`,
        );
      }
    }

    try {
      return await this.prisma.participant.update({
        where: { id },
        data:
          tripId == null
            ? { ...rest }
            : {
                ...rest,
                trip: { connect: { id: tripId } },
              },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(
          `Podczas aktualizacji wystąpił błąd w odnalezieniu użytkownika bądź przypisanej mu wycieczki`,
        );
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Participant> {
    await this.findOne(id);
    return this.prisma.participant.delete({ where: { id } });
  }
}
