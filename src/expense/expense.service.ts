import { Injectable } from "@nestjs/common";

import { ExchangeService } from "../exchange/exchange.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(
    private prisma: PrismaService,
    private exchangeService: ExchangeService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    let amountPLN = createExpenseDto.amount;

    const currency = createExpenseDto.currency ?? "PLN";
    if (currency !== "PLN") {
      const rate = await this.exchangeService.getRate(currency);
      amountPLN = createExpenseDto.amount * rate;
    }

    return this.prisma.expense.create({
      data: {
        trip_id: createExpenseDto.trip_id,
        amount: amountPLN,
        description: createExpenseDto.description,
        date: createExpenseDto.date,
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number) {
    return this.prisma.expense.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    let amountPLN: number | undefined;

    if (updateExpenseDto.amount !== undefined) {
      if (updateExpenseDto.currency && updateExpenseDto.currency !== "PLN") {
        const rate = await this.exchangeService.getRate(
          updateExpenseDto.currency,
        );
        amountPLN = updateExpenseDto.amount * rate;
      } else {
        amountPLN = updateExpenseDto.amount;
      }
    }

    return this.prisma.expense.update({
      where: { id },
      data: {
        trip_id: updateExpenseDto.trip_id,
        amount: amountPLN ?? undefined,
        description: updateExpenseDto.description,
        date: updateExpenseDto.date,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.expenseParticipant.deleteMany({
      where: { expense_id: id },
    });

    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
