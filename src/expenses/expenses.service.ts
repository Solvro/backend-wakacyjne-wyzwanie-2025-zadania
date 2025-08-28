import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import type { ExpenseDto } from "./dto/expense.dto";

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async addExpenseToTrip(tripId: number, createExpenseDto: ExpenseDto) {
    // Validate that trip exists
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${String(tripId)} not found`);
    }

    // Validate that participant exists and belongs to the trip
    const participant = await this.prisma.participant.findFirst({
      where: {
        id: createExpenseDto.participantId,
        tripId,
      },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${String(createExpenseDto.participantId)} not found in trip ${String(tripId)}`,
      );
    }

    return this.prisma.expense.create({
      data: {
        title: createExpenseDto.title,
        description: createExpenseDto.description,
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        date: new Date(createExpenseDto.date),
        tripId,
        participantId: createExpenseDto.participantId,
      },
      include: {
        participant: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updateExpense(expenseId: number, updateExpenseDto: ExpenseDto) {
    const existingExpense = await this.prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (existingExpense === null) {
      throw new NotFoundException(
        `Expense with ID ${String(expenseId)} not found`,
      );
    }

    return this.prisma.expense.update({
      where: { id: expenseId },
      data: {
        title: updateExpenseDto.title,
        description: updateExpenseDto.description,
        amount: updateExpenseDto.amount,
        category: updateExpenseDto.category,
        date: new Date(updateExpenseDto.date),
        participantId: updateExpenseDto.participantId,
      },
    });
  }

  async deleteExpense(expenseId: number) {
    const existingExpense = await this.prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (existingExpense === null) {
      throw new NotFoundException(
        `Expense with ID ${String(expenseId)} not found`,
      );
    }

    return this.prisma.expense.delete({
      where: { id: expenseId },
    });
  }
}
