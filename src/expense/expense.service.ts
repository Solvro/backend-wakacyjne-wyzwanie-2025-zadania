import { Expense, Prisma } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

interface ExpenseOptions {
  where?: Prisma.ExpenseWhereInput;
  orderBy?: Prisma.ExpenseOrderByWithRelationInput;
  skip?: number;
  take?: number;
}

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  private transformExpense(expense: Expense) {
    return {
      ...expense,
      amount: expense.amount === null ? null : Number(expense.amount),
      budgetLeft:
        expense.budgetLeft === null ? null : Number(expense.budgetLeft),
    };
  }

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = await this.database.expense.create({
      data: createExpenseDto,
    });
    return this.transformExpense(expense);
  }

  async findAll(options?: ExpenseOptions) {
    const expenses = await this.database.expense.findMany({
      where: options?.where,
      orderBy: options?.orderBy,
      skip: options?.skip,
      take: options?.take,
    });
    return expenses.map((expense) => this.transformExpense(expense));
  }

  async findOne(id: number) {
    const expense = await this.database.expense.findUnique({ where: { id } });
    if (expense === null) {
      throw new NotFoundException(`Expense with id ${String(id)} not found`);
    }
    return this.transformExpense(expense);
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.database.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
    return this.transformExpense(expense);
  }

  async remove(id: number) {
    const expense = await this.database.expense.delete({ where: { id } });
    return this.transformExpense(expense);
  }
}
