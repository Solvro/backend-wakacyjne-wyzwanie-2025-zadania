import { Expense, Prisma } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

type PrismaExpense = Expense & {
  amount: Prisma.Decimal;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  private _mapToDto(expense: PrismaExpense): ExpenseResponseDto {
    return {
      id: expense.id,
      payerId: expense.payerId,
      amount: expense.amount.toNumber(),
      category: expense.category,
      currency: expense.currency,
      paidAt: expense.paidAt === null ? null : expense.paidAt.toISOString(),
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    };
  }

  async create(
    createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    const newExpense = await this.prisma.expense.create({
      data: createExpenseDto,
    });
    return this._mapToDto(newExpense as PrismaExpense);
  }

  async findAll(): Promise<ExpenseResponseDto[]> {
    const expenses = await this.prisma.expense.findMany();
    return expenses.map((expense) => this._mapToDto(expense as PrismaExpense));
  }

  async findOne(id: number): Promise<ExpenseResponseDto> {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });
    if (expense === null) {
      throw new NotFoundException(
        `Nie znaleziono wydatku o numerze ${String(id)}`,
      );
    }
    return this._mapToDto(expense as PrismaExpense);
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    const existingExpense = await this.prisma.expense.findUnique({
      where: { id },
    });
    if (existingExpense === null) {
      throw new NotFoundException(
        `Nie znaleziono wydatku o numerze ${String(id)}`,
      );
    }

    const updatedExpense = await this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });

    return this._mapToDto(updatedExpense as PrismaExpense);
  }

  async remove(id: number): Promise<ExpenseResponseDto> {
    const existingExpense = await this.prisma.expense.findUnique({
      where: { id },
    });
    if (existingExpense === null) {
      throw new NotFoundException(
        `Nie znaleziono wydatku o numerze ${String(id)}`,
      );
    }

    const deletedExpense = await this.prisma.expense.delete({
      where: { id },
    });
    return this._mapToDto(deletedExpense as PrismaExpense);
  }
}
