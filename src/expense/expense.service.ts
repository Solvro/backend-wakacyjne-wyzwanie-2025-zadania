import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

interface ExpenseOptions {
  where?: Prisma.ExpenseWhereInput;
  orderBy?: Prisma.ExpenseOrderByWithRelationInput;
  skip?: number;
  take?: number;
}

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.database.expense.create({
      data: createExpenseDto,
    });
  }

  async findAll(options?: ExpenseOptions) {
    return this.database.expense.findMany({
      where: options?.where,
      orderBy: options?.orderBy,
      skip: options?.skip,
      take: options?.take,
    });
  }

  async findOne(id: number) {
    return this.database.expense.findUnique({ where: { id } });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.database.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    return this.database.expense.delete({ where: { id } });
  }
}
