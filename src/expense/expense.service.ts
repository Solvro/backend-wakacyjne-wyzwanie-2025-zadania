import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}
  async create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        Name: createExpenseDto.Name,
        Description: createExpenseDto.Description,
        Value: createExpenseDto.Value,
        Trip_id: createExpenseDto.Trip_id,
        Participant_id: createExpenseDto.Participant_id,
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
    return this.prisma.trip.update({ where: { id }, data: updateExpenseDto });
  }

  async remove(id: number) {
    return this.prisma.expense.delete({ where: { id } });
  }
}
