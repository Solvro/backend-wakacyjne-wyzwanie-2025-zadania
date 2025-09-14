import { Expense } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./create-expense.dto";
import { UpdateExpenseDto } from "./update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Expense[]> {
    return this.databaseService.expense.findMany();
  }

  async getOne(id: number): Promise<Expense> {
    const expense = await this.databaseService.expense.findUnique({
      where: {
        id,
      },
    });

    if (expense === null) {
      throw new NotFoundException("Expense not found");
    }

    return expense;
  }

  async create(dto: CreateExpenseDto): Promise<Expense> {
    return this.databaseService.expense.create({
      data: {
        description: dto.description,
        amount: dto.amount,
        currency: dto.currency,
        date: new Date(dto.date),
        participant_id: dto.participant_id,
        trip_id: dto.trip_id,
      },
    });
  }

  async update(id: number, dto: UpdateExpenseDto): Promise<Expense> {
    return this.databaseService.expense.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number): Promise<void> {
    await this.databaseService.expense.delete({
      where: { id },
    });
  }
}
