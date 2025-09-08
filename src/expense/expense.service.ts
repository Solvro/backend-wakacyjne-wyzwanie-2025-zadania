import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const trip = this.database.trip.findUnique({
      where: { id: createExpenseDto.tripId },
    });

    if (!trip) {
      throw new NotFoundException("Trip not found");
    }

    return this.database.expense.create({
      data: {
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        trip: { connect: { id: createExpenseDto.tripId } },
      },
      include: { trip: true },
    });
  }

  async findAll() {
    return this.database.expense.findMany({
      include: { trip: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const expense = this.database.expense.findUnique({
      where: { id },
      include: { trip: true },
    });

    if (!expense) {
      throw new NotFoundException("Expense not found");
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const existingExpense = this.database.expense.findUnique({
      where: { id },
    });

    if (!existingExpense) {
      throw new NotFoundException("Expense not found");
    }

    if (updateExpenseDto.tripId !== undefined) {
      const trip = this.database.trip.findUnique({
        where: { id: updateExpenseDto.tripId },
      });

      if (!trip) {
        throw new NotFoundException("Trip not found");
      }
    }

    return this.database.expense.update({
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
    const expense = this.database.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException("Expense not found");
    }

    await this.database.expense.delete({
      where: { id },
    });

    return { message: "Expense deleted successfully" };
  }
}
