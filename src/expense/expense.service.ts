import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CurrencyService } from "../currency/currency.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly currencyService: CurrencyService,
  ) {}

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
    const participant = await this.prisma.participant.findUnique({
      where: { id: dto.participantId },
    });
    if (participant === null) {
      throw new NotFoundException(
        `Participant with id ${String(dto.participantId)} not found`,
      );
    }

    const currency = dto.currency ?? "PLN";
    let rate: number;
    try {
      rate = await this.currencyService.getRate(currency);
    } catch (error) {
      if (currency !== "PLN") {
        throw new BadRequestException(
          `Error: ${String(error)} No rate available for ${currency}`,
        );
      }
      rate = 1;
    }

    const amountPLN = Number((dto.amount * rate).toFixed(2));

    return this.prisma.expense.create({
      data: {
        participantId: dto.participantId,
        amount: dto.amount,
        currency,
        amountPLN,
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

    if (dto.participantId !== undefined) {
      const participant = await this.prisma.participant.findUnique({
        where: { id: dto.participantId },
      });
      if (participant === null) {
        throw new NotFoundException(
          `Participant with id ${String(dto.participantId)} not found`,
        );
      }
    }

    let amountPLN: number | undefined;

    if (dto.amount !== undefined || dto.currency !== undefined) {
      const existingExpense = await this.prisma.expense.findUnique({
        where: { id },
      });
      if (existingExpense == null) {
        throw new NotFoundException("Expense not found");
      }

      const resolvedCurrency = dto.currency ?? existingExpense.currency;
      const resolvedAmount = dto.amount ?? existingExpense.amount;

      const rate =
        resolvedCurrency === "PLN"
          ? 1
          : await this.currencyService.getRate(resolvedCurrency);

      amountPLN = Number((resolvedAmount * rate).toFixed(2));
    }
    return this.prisma.expense.update({
      where: { id },
      data: {
        amount: dto.amount,
        currency: dto.currency,
        amountPLN,
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
