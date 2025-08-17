import { ExpenseCategory } from "@prisma/client";

import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";

interface CreateExpenseDTO {
  title: string;
  category?: ExpenseCategory;
  recipient?: string;
  amount?: number;
  currency?: string;
  value?: number;
  left?: number;
  note?: string;
  participantId: number;
  tripId: number;
}

@Controller("expenses")
export class ExpensesController {
  constructor(private prisma: DatabaseService) {}

  @Get()
  async getAllExpenses() {
    return await this.prisma.expense.findMany({
      include: {
        participant: true,
        trip: true,
      },
    });
  }

  @Get(":id")
  async getExpenseById(@Param("id") id: string) {
    return await this.prisma.expense.findUnique({
      where: { id: Number.parseInt(id) },
      include: {
        participant: true,
        trip: true,
      },
    });
  }

  @Post()
  async createExpense(@Body() data: CreateExpenseDTO) {
    return await this.prisma.expense.create({
      data: {
        title: data.title,
        category: data.category,
        recipient: data.recipient,
        amount: data.amount,
        currency: data.currency ?? "PLN",
        value: data.value,
        left: data.left,
        note: data.note,
        participantId: data.participantId,
        tripId: data.tripId,
      },
      include: {
        participant: true,
        trip: true,
      },
    });
  }

  @Delete(":id")
  async deleteExpense(@Param("id") id: string) {
    return await this.prisma.expense.delete({
      where: { id: Number.parseInt(id) },
    });
  }

  @Get("trip/:tripId")
  async getExpensesByTrip(@Param("tripId") tripId: string) {
    return await this.prisma.expense.findMany({
      where: { tripId: Number.parseInt(tripId) },
      include: {
        participant: true,
        trip: true,
      },
    });
  }

  @Get("participant/:participantId")
  async getExpensesByParticipant(
    @Param("participantId") participantId: string,
  ) {
    return await this.prisma.expense.findMany({
      where: { participantId: Number.parseInt(participantId) },
      include: {
        participant: true,
        trip: true,
      },
    });
  }
}
