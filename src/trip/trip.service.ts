import { ExpenseResponseDto } from "src/expense/dto/expense-response.dto";
import { PersonResponseDto } from "src/person/dto/person-response.dto";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTripDto): Promise<TripResponseDto> {
    return await this.prisma.trip.create({ data: dto });
  }

  async findAll(): Promise<TripResponseDto[]> {
    return await this.prisma.trip.findMany();
  }

  async findOne(id: number): Promise<TripResponseDto | null> {
    return await this.prisma.trip.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateTripDto): Promise<TripResponseDto> {
    return await this.prisma.trip.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<TripResponseDto> {
    return await this.prisma.trip.delete({ where: { id } });
  }

  async getParticipants(id: number): Promise<PersonResponseDto[]> {
    const participants = await this.prisma.participant.findMany({
      where: { trip_id: id },
    });
    const personIds = participants.map((p) => p.person_id);
    return await this.prisma.person.findMany({
      where: { id: { in: personIds } },
    });
  }

  async getExpenses(id: number): Promise<ExpenseResponseDto[]> {
    const expenses = await this.prisma.expense.findMany({
      where: { trip_id: id },
    });
    return expenses.map((expense) => ({
      ...expense,
      amount: expense.amount.toNumber(),
    }));
  }
}
