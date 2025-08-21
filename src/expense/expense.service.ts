import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.database.expense.create({
      data: {
        title: createExpenseDto.title,
        category: createExpenseDto.category,
        amount: createExpenseDto.amount,
        date: createExpenseDto.date,
        trip_id: createExpenseDto.trip_id,
        participant_id: createExpenseDto.participant_id,
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(expense_id: number) {
    return this.database.expense.findUnique({ where: { expense_id } });
  }

  async update(expense_id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.database.expense.update({
      where: { expense_id },
      data: {
        title: updateExpenseDto.title,
        category: updateExpenseDto.category,
        amount: updateExpenseDto.amount,
        date: updateExpenseDto.date,
      },
    });
  }

  async remove(expense_id: number) {
    return this.database.expense.delete({ where: { expense_id } });
  }
}
