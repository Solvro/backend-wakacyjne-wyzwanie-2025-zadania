import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("expense")
@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({
    status: 201,
    description: "Expense created successfully.",
    type: ExpenseResponseDto,
  })
  @Post()
  async create(@Body() dto: CreateExpenseDto): Promise<ExpenseResponseDto> {
    return await this.expenseService.create(dto);
  }

  @ApiOperation({ summary: "Get all expenses" })
  @ApiResponse({
    status: 200,
    description: "List of all expenses.",
    type: [ExpenseResponseDto],
  })
  @Get()
  async findAll(): Promise<ExpenseResponseDto[]> {
    return await this.expenseService.findAll();
  }

  @ApiOperation({ summary: "Get expense by ID" })
  @ApiResponse({
    status: 200,
    description: "Expense found.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ExpenseResponseDto | null> {
    return await this.expenseService.findOne(id);
  }

  @ApiOperation({ summary: "Delete expense by ID" })
  @ApiResponse({
    status: 200,
    description: "Expense deleted successfully.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ExpenseResponseDto> {
    return await this.expenseService.remove(id);
  }

  @ApiOperation({ summary: "Update expense by ID" })
  @ApiResponse({
    status: 200,
    description: "Expense updated successfully.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    return await this.expenseService.update(id, dto);
  }
}
