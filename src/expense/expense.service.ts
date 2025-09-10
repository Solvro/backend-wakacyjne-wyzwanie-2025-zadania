import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}
  findOneOrFail(id: number) {
    const expense: unknown = this.database.expense.findUnique({
      where: { id },
    });
    if (expense == null) {
      throw new NotFoundException("Expense not found");
    }
  }

  tripIdCheck(id: number | undefined) {
    const expense: unknown = this.database.trip.findUnique({
      where: { id },
    });
    if (expense == null) {
      throw new NotFoundException("TripId not found");
    }
  }

  async create(createExpenseDto: CreateExpenseDto) {
    return this.database.expense.create({
      data: {
        dailyPrice: createExpenseDto.dailyPrice,
        tripId: createExpenseDto.tripId,
        discount: createExpenseDto.discount,
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    this.findOneOrFail(id);
    return this.database.expense.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    this.findOneOrFail(id);
    if (typeof updateExpenseDto.tripId != "undefined") {
      this.tripIdCheck(updateExpenseDto.tripId);
    }

    return this.database.expense.update({
      where: { id },
      data: {
        dailyPrice: updateExpenseDto.dailyPrice,
        tripId: updateExpenseDto.tripId,
        discount: updateExpenseDto.discount,
      },
    });
  }

  async remove(id: number) {
    this.findOneOrFail(id);
    return this.database.expense.delete({ where: { id } });
  }
}
