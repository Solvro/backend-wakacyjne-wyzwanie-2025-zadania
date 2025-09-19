import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    await this.database.expense.create({
      data: {
        amount: createExpenseDto.amount,
        tripParticipantId: createExpenseDto.tripParticipantId,
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    return this.database.expense.findUnique({ where: { id } });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.database.expense.update({
      where: { id },
      data: {
        amount: updateExpenseDto.amount,
        tripParticipantId: updateExpenseDto.tripParticipantId,
      },
    });
  }

  async remove(id: number) {
    return this.database.expense.deleteMany({ where: { id } });
  }
}
