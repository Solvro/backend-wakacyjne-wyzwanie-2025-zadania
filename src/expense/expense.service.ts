import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private readonly database: DatabaseService) {}

  private async getTripOrThrow(trip_id: number) {
    const trip = await this.database.trip.findUnique({ where: { trip_id } });
    if (trip == null) {
      throw new NotFoundException(
        `Trip with ID ${trip_id.toString()} not found`,
      );
    }
    return trip;
  }

  private async getExpenseOrThrow(expense_id: number) {
    const expense = await this.database.expense.findUnique({
      where: { expense_id },
    });
    if (expense == null) {
      throw new NotFoundException(
        `Expense with ID ${expense_id.toString()} not found`,
      );
    }
    return expense;
  }

  async create(dto: CreateExpenseDto) {
    await this.getTripOrThrow(dto.trip_id);
    return this.database.expense.create({
      data: {
        trip: { connect: { trip_id: dto.trip_id } },
        expense_type: dto.expense_type,
        expense_date: dto.expense_date,
        cost: dto.cost,
        description: dto.description,
      },
      include: {
        trip: { select: { trip_id: true, name: true, destination: true } },
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany({
      include: { trip: { select: { trip_id: true, name: true } } },
      orderBy: { expense_date: "desc" },
    });
  }

  async findOne(id: number) {
    return this.getExpenseOrThrow(id);
  }

  async update(id: number, dto: UpdateExpenseDto) {
    const current = await this.getExpenseOrThrow(id);

    if (dto.trip_id !== undefined) {
      await this.getTripOrThrow(dto.trip_id);
    }

    return this.database.expense.update({
      where: { expense_id: id },
      data: {
        expense_type: dto.expense_type,
        expense_date: dto.expense_date ?? current.expense_date,
        cost: dto.cost,
        description: dto.description,
        ...(dto.trip_id !== undefined && {
          trip: { connect: { trip_id: dto.trip_id } },
        }),
      },
      include: { trip: { select: { trip_id: true, name: true } } },
    });
  }

  async remove(id: number): Promise<void> {
    await this.getExpenseOrThrow(id);
    await this.database.expense.delete({ where: { expense_id: id } });
  }
}
