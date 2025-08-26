import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}
  async create(createExpenseDto: CreateExpenseDto) {
    return this.database.expense.create({ data: createExpenseDto });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    return this.database.expense.findUnique({ where: { id_e: id } });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.database.expense.update({
      where: { id_e: id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    return this.database.expense.delete({
      where: { id_e: id },
    });
  }
}
