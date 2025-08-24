import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.expense.findMany({
      include: { participant: { include: { trip: true } } },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.expense.findUnique({
      where: { id },
      include: { participant: { include: { trip: true } } },
    });
    if (item === null) {
      throw new NotFoundException("Expense not found");
    }
    return item;
  }

  async create(dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        participantId: dto.participantId,
        amount: dto.amount,
        category: dto.category,
        note: dto.note,
        paidAt:
          dto.paidAt === undefined
            ? undefined
            : dto.paidAt === null
              ? null
              : new Date(dto.paidAt),
      },
    });
  }

  async update(id: number, dto: UpdateExpenseDto) {
    await this.ensureExists(id);
    return this.prisma.expense.update({
      where: { id },
      data: {
        amount: dto.amount,
        category: dto.category,
        note: dto.note,
        participantId: dto.participantId,
        paidAt:
          dto.paidAt === undefined
            ? undefined
            : dto.paidAt === null
              ? null
              : new Date(dto.paidAt),
      },
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    await this.prisma.expense.delete({ where: { id } });
    return { deleted: true };
  }

  private async ensureExists(id: number) {
    const exists = await this.prisma.expense.findUnique({ where: { id } });
    if (exists === null) {
      throw new NotFoundException("Expense not found");
    }
  }
}
