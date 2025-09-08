import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const trip = await this.database.trip.findUnique({
      where: { id: createExpenseDto.tripId },
    });

    if (trip === null) {
      throw new NotFoundException("Trip not found");
    }

    return await this.database.expense.create({
      data: {
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        trip: { connect: { id: createExpenseDto.tripId } },
      },
      include: { trip: true },
    });
  }

  async findAll() {
    return await this.database.expense.findMany({
      include: { trip: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const expense = await this.database.expense.findUnique({
      where: { id },
      include: { trip: true },
    });

    if (expense === null) {
      throw new NotFoundException("Expense not found");
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const existingExpense = await this.database.expense.findUnique({
      where: { id },
    });

    if (existingExpense === null) {
      throw new NotFoundException("Expense not found");
    }

    if (updateExpenseDto.tripId !== undefined) {
      const trip = await this.database.trip.findUnique({
        where: { id: updateExpenseDto.tripId },
      });

      if (trip === null) {
        throw new NotFoundException("Trip not found");
      }
    }

    return await this.database.expense.update({
      where: { id },
      data: {
        amount: updateExpenseDto.amount,
        category: updateExpenseDto.category,
        tripId: updateExpenseDto.tripId,
      },
      include: { trip: true },
    });
  }

  async remove(id: number) {
    const expense = await this.database.expense.findUnique({
      where: { id },
    });

    if (expense === null) {
      throw new NotFoundException("Expense not found");
    }

    await this.database.expense.delete({
      where: { id },
    });

    return { message: "Expense deleted successfully" };
  }
}
