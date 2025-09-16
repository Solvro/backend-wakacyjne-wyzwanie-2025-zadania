import { DatabaseService } from "src/database/database.service";
import { PaginationDto } from "src/pagination/pagination.dto";
import { DEFAULT_PAGE_SIZE } from "src/pagination/utils/constants";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto, id: number) {
    if (createExpenseDto.title === "" || createExpenseDto.date === "") {
      throw new BadRequestException("Missing arguments");
    }
    return this.database.expense.create({
      data: {
        title: createExpenseDto.title,
        category: createExpenseDto.category,
        amount: createExpenseDto.amount,
        date: createExpenseDto.date,
        trip_id: createExpenseDto.trip_id,
        participant_id: id,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return this.database.expense.findMany({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(expense_id: number) {
    const expense = await this.database.expense.findUnique({
      where: { expense_id },
    });
    if (expense == null) {
      throw new NotFoundException("No expense with this id");
    }
    return expense;
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
