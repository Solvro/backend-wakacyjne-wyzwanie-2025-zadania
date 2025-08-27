import { Expense } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";
import { ExpenseService } from "./expense.service";
import { UpdateExpenseDto } from "./update-expense.dto";

@ApiTags("Expense")
@Controller("api/v1/expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get("all")
  @ApiOperation({ summary: "Get all expenses" })
  @ApiResponse({ status: 200, description: "List of expenses" })
  async getAll() {
    return await this.expenseService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single expense by ID" })
  @ApiParam({ name: "id", type: Number, description: "Expense ID" })
  @ApiResponse({ status: 200, description: "Expense found" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async getOne(@Param("id") id: string) {
    return await this.expenseService.getOne(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new expense" })
  @ApiBody({ type: CreateExpenseDto })
  @ApiResponse({ status: 201, description: "Expense created" })
  async post(@Body() dto: CreateExpenseDto): Promise<Expense> {
    return await this.expenseService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update existing expense" })
  @ApiBody({ type: UpdateExpenseDto })
  @ApiResponse({ status: 200, description: "Expense updated" })
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateExpenseDto,
  ): Promise<Expense> {
    return await this.expenseService.update(Number(id), dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an expense by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the expense to delete",
  })
  @ApiResponse({ status: 200, description: "Expense deleted" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async delete(@Param("id") id: string) {
    await this.expenseService.delete(Number(id));
  }
}
