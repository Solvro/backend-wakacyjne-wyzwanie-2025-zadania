import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.database.expense.create({
      data: {
        amount: createExpenseDto.amount,
        description: createExpenseDto.description ?? "",
        createdAt: new Date(createExpenseDto.createdAt ?? Date.now()),
        tripId: createExpenseDto.tripId,
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    return this.database.expense.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.database.expense.update({
      where: { id },
      data: {
        amount: updateExpenseDto.amount,
        description: updateExpenseDto.description,
        createdAt: updateExpenseDto.createdAt,
        tripId: updateExpenseDto.tripId,
      },
    });
  }

  async remove(id: number) {
    return this.database.expense.delete({
      where: { id },
    });
  }
}
