import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: "Create expense" })
  @ApiResponse({ status: 201, description: "The expense has been created." })
  @ApiResponse({ status: 404, description: "Trip not found." })
  @ApiResponse({ status: 400, description: "Bad request." })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all expenses" })
  @ApiResponse({
    status: 200,
    description: "List of expenses retrieved successfully.",
  })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get expense by ID" })
  @ApiResponse({ status: 200, description: "Expense retrieved successfully." })
  @ApiResponse({ status: 404, description: "Expense not found." })
  findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update expense by ID" })
  @ApiResponse({ status: 200, description: "Expense updated successfully." })
  @ApiResponse({ status: 404, description: "Expense or Trip not found." })
  @ApiResponse({ status: 400, description: "Bad request." })
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete expense by ID" })
  @ApiResponse({ status: 200, description: "Expense deleted successfully." })
  @ApiResponse({ status: 404, description: "Expense not found." })
  remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
