import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("expenses")
@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({ status: 201, description: "Expense created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 404, description: "Trip not found" })
  @ApiResponse({
    status: 409,
    description: "Expense conflict (duplicate or invalid state)",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all expenses" })
  @ApiResponse({ status: 200, description: "List of expenses retrieved" })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get expense by ID" })
  @ApiResponse({ status: 200, description: "Expense details retrieved" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update expense by ID" })
  @ApiResponse({ status: 200, description: "Expense updated successfully" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete expense by ID" })
  @ApiResponse({ status: 204, description: "Expense deleted successfully" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.expenseService.remove(id);
  }
}
