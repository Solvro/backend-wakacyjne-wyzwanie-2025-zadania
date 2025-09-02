import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private readonly database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const trip = await this.database.trip.findUnique({
      where: { trip_id: createExpenseDto.trip_id },
    });

    if (trip == null) {
      throw new NotFoundException(
        `Trip with ID ${String(createExpenseDto.trip_id)} not found`,
      );
    }

    return this.database.expense.create({
      data: {
        trip: { connect: { trip_id: createExpenseDto.trip_id } },
        expense_type: createExpenseDto.expense_type,
        expense_date: new Date(createExpenseDto.expense_date),
        cost: createExpenseDto.cost,
        description: createExpenseDto.description,
      },
      include: {
        trip: {
          select: {
            trip_id: true,
            name: true,
            destination: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany({
      include: {
        trip: {
          select: { trip_id: true, name: true },
        },
      },
      orderBy: { expense_date: "desc" },
    });
  }

  async findOne(id: number) {
    const expense = await this.database.expense.findUnique({
      where: { expense_id: id },
      include: {
        trip: { select: { trip_id: true, name: true, destination: true } },
      },
    });

    if (expense == null) {
      throw new NotFoundException(`Expense with ID ${String(id)} not found`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.database.expense.findUnique({
      where: { expense_id: id },
    });

    if (expense == null) {
      throw new NotFoundException(`Expense with ID ${String(id)} not found`);
    }

    if (updateExpenseDto.trip_id !== undefined) {
      const trip = await this.database.trip.findUnique({
        where: { trip_id: updateExpenseDto.trip_id },
      });
      if (trip == null) {
        throw new NotFoundException(
          `Trip with ID ${String(updateExpenseDto.trip_id)} not found`,
        );
      }
    }

    // jawny null/empty-check dla expense_date (bez truthy-checka)
    const nextExpenseDate =
      updateExpenseDto.expense_date == null ||
      updateExpenseDto.expense_date === ""
        ? expense.expense_date
        : new Date(updateExpenseDto.expense_date);

    const data: Prisma.ExpenseUpdateInput = {
      expense_type: updateExpenseDto.expense_type,
      expense_date: nextExpenseDate,
      cost: updateExpenseDto.cost,
      description: updateExpenseDto.description,
    };

    if (updateExpenseDto.trip_id !== undefined) {
      data.trip = { connect: { trip_id: updateExpenseDto.trip_id } };
    }

    return this.database.expense.update({
      where: { expense_id: id },
      data,
      include: {
        trip: { select: { trip_id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    const expense = await this.database.expense.findUnique({
      where: { expense_id: id },
    });

    if (expense == null) {
      throw new NotFoundException(`Expense with ID ${String(id)} not found`);
    }

    await this.database.expense.delete({ where: { expense_id: id } });
    return { message: `Expense with ID ${String(id)} deleted successfully` };
  }
}
