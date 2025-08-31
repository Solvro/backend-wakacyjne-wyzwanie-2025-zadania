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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new expense",
    description: "Adds a new expense to a specific trip.",
  })
  @ApiResponse({
    status: 201,
    description: "Expense created successfully.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data.",
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found.",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieves a list of all expenses from all trips.",
  })
  @ApiResponse({
    status: 200,
    description: "List of all expenses retrieved successfully.",
    type: [ExpenseResponseDto],
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by ID",
    description:
      "Retrieves detailed information about a specific expense based on its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Expense retrieved successfully.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found.",
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update an expense",
    description:
      "Updates the details of an existing expense identified by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated successfully.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found.",
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete an expense",
    description: "Removes an existing expense identified by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Expense deleted successfully.",
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found.",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
