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
    if (!trip) {
      throw new NotFoundException(
        `Trip with ID ${createExpenseDto.trip_id} not found`,
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

  findAll() {
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

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.database.expense.findUnique({
      where: { expense_id: id },
    });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    if (updateExpenseDto.trip_id !== undefined) {
      const trip = await this.database.trip.findUnique({
        where: { trip_id: updateExpenseDto.trip_id },
      });
      if (!trip) {
        throw new NotFoundException(
          `Trip with ID ${updateExpenseDto.trip_id} not found`,
        );
      }
    }

    const data: any = {
      expense_type: updateExpenseDto.expense_type,
      expense_date: updateExpenseDto.expense_date
        ? new Date(updateExpenseDto.expense_date)
        : expense.expense_date,
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
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    await this.database.expense.delete({ where: { expense_id: id } });
    return { message: `Expense with ID ${id} deleted successfully` };
  }
}
