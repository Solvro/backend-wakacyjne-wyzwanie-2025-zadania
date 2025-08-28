import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new expense",
    description: "Add a new expense to the trip",
  })
  @ApiResponse({
    status: 201,
    description: "Expense created",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve the list of all expenses",
  })
  @ApiResponse({
    status: 200,
    description: "List of all expenses",
    type: [CreateExpenseResponseDto],
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.expenseService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrieve a single expense by its unique ID",
  })
  @ApiResponse({
    status: 200,
    description: "Expense found",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update expense by ID",
    description: "Modify an existing expense",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete expense by ID",
    description: "Remove an expense from the trip",
  })
  @ApiResponse({
    status: 200,
    description: "Expense removed",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
