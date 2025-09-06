import { Expense } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  async findAll(): Promise<Expense[]> {
    return this.prisma.expense.findMany({ include: { payer: true } });
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (expense == null) {
      throw new NotFoundException(
        `Expense with ID ${String(id)} hasn't been found`,
      );
    }
    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    await this.findOne(id);
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number): Promise<Expense> {
    await this.findOne(id);
    return this.prisma.expense.delete({ where: { id } });
  }
}
