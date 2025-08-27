import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExpenseDto): Promise<ExpenseResponseDto> {
    const expense = await this.prisma.expense.create({ data: dto });
    return {
      ...expense,
      amount: expense.amount.toNumber(),
    };
  }

  async findAll(): Promise<ExpenseResponseDto[]> {
    const expenses = await this.prisma.expense.findMany({
      include: { trip: true, person: true },
    });
    return expenses.map((expense) => ({
      ...expense,
      amount: expense.amount.toNumber(),
    }));
  }

  async findOne(id: number): Promise<ExpenseResponseDto | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: { trip: true, person: true },
    });
    if (expense === null) {
      return null;
    }
    return {
      ...expense,
      amount: expense.amount.toNumber(),
    };
  }

  async update(id: number, dto: UpdateExpenseDto): Promise<ExpenseResponseDto> {
    const expense = await this.prisma.expense.update({
      where: { id },
      data: dto,
      include: { trip: true, person: true },
    });
    return {
      ...expense,
      amount: expense.amount.toNumber(),
    };
  }

  async remove(id: number): Promise<ExpenseResponseDto> {
    const expense = await this.prisma.expense.delete({ where: { id } });
    return {
      ...expense,
      amount: expense.amount.toNumber(),
    };
  }
}
