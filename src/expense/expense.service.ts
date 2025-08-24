import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.database.expense.create({
      data: {
        tripId: createExpenseDto.tripId,
        expenseAmount: createExpenseDto.expenseAmount,
        expenseDescription: createExpenseDto.expenseDescription,
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    return this.database.expense.findUnique({
      where: { expenseId: id },
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.database.expense.update({
      where: { expenseId: id },
      data: {
        tripId: updateExpenseDto.tripId,
        expenseAmount: updateExpenseDto.expenseAmount,
        expenseDescription: updateExpenseDto.expenseDescription,
      },
    });
  }

  async remove(id: number) {
    return this.database.expense.delete({ where: { expenseId: id } });
  }
}
