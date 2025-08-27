import { ExpenseResponseDto } from "src/expense/dto/expense-response.dto";
import { TripResponseDto } from "src/trip/dto/trip-response.dto";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { PersonResponseDto } from "./dto/person-response.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePersonDto): Promise<PersonResponseDto> {
    return await this.prisma.person.create({ data: dto });
  }

  async findAll(): Promise<PersonResponseDto[]> {
    return await this.prisma.person.findMany();
  }

  async findOne(id: number): Promise<PersonResponseDto | null> {
    return await this.prisma.person.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdatePersonDto): Promise<PersonResponseDto> {
    return await this.prisma.person.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<PersonResponseDto> {
    return await this.prisma.person.delete({ where: { id } });
  }

  async getExpenses(id: number): Promise<ExpenseResponseDto[]> {
    const expenses = await this.prisma.expense.findMany({
      where: { person_id: id },
    });
    return expenses.map((expense) => ({
      ...expense,
      amount: expense.amount.toNumber(),
    }));
  }

  async getTrips(id: number): Promise<TripResponseDto[]> {
    return await this.prisma.trip.findMany({
      where: {
        participants: {
          some: { person_id: id },
        },
      },
    });
  }
}
