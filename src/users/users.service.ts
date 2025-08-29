import { Injectable } from "@nestjs/common";

import { ExpenseResponseDto } from "../expenses/dto/expense-response.dto";
import { PrismaService } from "../prisma/prisma.service";
import { TripResponseDto } from "../trips/dto/trip-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    return await this.prisma.user.create({ data: dto });
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserResponseDto | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    return await this.prisma.user.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<UserResponseDto> {
    return await this.prisma.user.delete({ where: { id } });
  }

  async getExpenses(id: number): Promise<ExpenseResponseDto[]> {
    const expenses = await this.prisma.expense.findMany({
      where: { user_id: id },
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
          some: { user_id: id },
        },
      },
    });
  }
}
