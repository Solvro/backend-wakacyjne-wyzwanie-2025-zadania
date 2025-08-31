import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const trip = await this.databaseService.trip.findUnique({
      where: { trip_id: createExpenseDto.tripId },
    });

    if (trip === null) {
      throw new NotFoundException(
        `Trip with ID ${createExpenseDto.tripId.toString()} not found`,
      );
    }

    return this.databaseService.expense.create({
      data: {
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        description: createExpenseDto.description,
        trip_id: createExpenseDto.tripId,
      },
      include: {
        trip: {
          select: {
            destination: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.expense.findMany({
      include: {
        trip: {
          select: {
            destination: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: { expense_id: id },
      include: {
        trip: {
          select: {
            destination: true,
          },
        },
      },
    });

    if (expense === null) {
      throw new NotFoundException(`Expense with ID ${id.toString()} not found`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const existingExpense = await this.databaseService.expense.findUnique({
      where: { expense_id: id },
    });

    if (existingExpense === null) {
      throw new NotFoundException(`Expense with ID ${id.toString()} not found`);
    }

    if (updateExpenseDto.tripId != null) {
      const trip = await this.databaseService.trip.findUnique({
        where: { trip_id: updateExpenseDto.tripId },
      });

      if (trip === null) {
        throw new NotFoundException(
          `Trip with ID ${updateExpenseDto.tripId.toString()} not found`,
        );
      }
    }

    return this.databaseService.expense.update({
      where: { expense_id: id },
      data: {
        amount: updateExpenseDto.amount,
        category: updateExpenseDto.category,
        description: updateExpenseDto.description,
        ...(updateExpenseDto.tripId != null && {
          trip: {
            connect: {
              trip_id: updateExpenseDto.tripId,
            },
          },
        }),
      },
      include: {
        trip: {
          select: {
            destination: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: { expense_id: id },
    });

    if (expense === null) {
      throw new NotFoundException(`Expense with ID ${id.toString()} not found`);
    }

    await this.databaseService.expense.delete({
      where: { expense_id: id },
    });

    return { message: `Expense with ID ${id.toString()} deleted successfully` };
  }
}
