import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}
  async create(
    createExpenseDto: CreateExpenseDto,
  ): Promise<CreateExpenseResponseDto> {
    return this.prisma.expense.create({
      data: {
        name: createExpenseDto.name,
        description: createExpenseDto.description,
        value: createExpenseDto.value,
        trip_id: createExpenseDto.trip_id,
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number) {
    return this.prisma.expense.findUnique({ where: { id } });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    return this.prisma.expense.delete({ where: { id } });
  }
}
