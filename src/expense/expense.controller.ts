import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import {
  CreateExpenseDto,
  ExpenseResponseDto,
  UpdateExpenseDto,
} from "../dto/expense.dto";

@Controller("expenses")
export class ExpensesController {
  constructor(private readonly prisma: DatabaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateExpenseDto): Promise<ExpenseResponseDto> {
    try {
      return await this.prisma.expense.create({
        data: dto,
        include: {
          participant: true,
          trip: true,
        },
      });
    } catch {
      throw new BadRequestException("Failed to create expense");
    }
  }

  @Get()
  async findAll(): Promise<ExpenseResponseDto[]> {
    try {
      const expenses = await this.prisma.expense.findMany({
        include: {
          participant: true,
          trip: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return expenses;
    } catch {
      throw new InternalServerErrorException("Failed to retrieve expenses");
    }
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ExpenseResponseDto> {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        participant: true,
        trip: true,
      },
    });
    if (expense === null) {
      throw new NotFoundException(`Expense with ID ${id.toString()} not found`);
    }
    return expense;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    try {
      const expense = await this.prisma.expense.update({
        where: { id },
        data: dto,
        include: {
          participant: true,
          trip: true,
        },
      });
      return expense;
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        throw new NotFoundException(
          `Expense with ID ${id.toString()} not found`,
        );
      }
      throw new BadRequestException("Failed to update expense");
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    try {
      await this.prisma.expense.delete({ where: { id } });
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        throw new NotFoundException(
          `Expense with ID ${id.toString()} not found`,
        );
      }
      throw new BadRequestException("Failed to delete expense");
    }
  }
}
