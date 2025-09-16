import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.database.expense.create({
      data: {
        name: createExpenseDto.name,
        description: createExpenseDto.description,
        value: createExpenseDto.value,
        date: createExpenseDto.date,
        trip_participant: {
          connect: { id: createExpenseDto.trip_participant_id },
        },
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    const response = await this.database.expense.findUnique({ where: { id } });
    if (response === null) {
      throw new NotFoundException("Expense with this id does not exist");
    }
    return response;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    if (updateExpenseDto.trip_participant_id === undefined) {
      const existingExpense = await this.database.expense.findUnique({
        where: { id },
        select: { trip_participant_id: true },
      });

      if (existingExpense === null) {
        throw new Error("Expense not found");
      }
      updateExpenseDto.trip_participant_id =
        existingExpense.trip_participant_id;
    }

    return this.database.expense.update({
      where: { id },
      data: {
        name: updateExpenseDto.name,
        description: updateExpenseDto.description,
        value: updateExpenseDto.value,
        date: updateExpenseDto.date,
        trip_participant: {
          connect: { id: updateExpenseDto.trip_participant_id },
        },
      },
    });
  }

  async remove(id: number) {
    return this.database.expense.delete({ where: { id } });
  }
}
