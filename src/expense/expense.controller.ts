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

import { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a expense",
    description: "Add a expense for which you can add description",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Expense created",
    type: CreateExpenseResponseDto,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve a list of all expenses in the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of expenses retrieved successfully",
    type: [CreateExpenseResponseDto],
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrieve detailed information about a specific expense",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Expense details retrieved successfully",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Expense not found (lucky you)",
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update expense details",
    description: "Modify information for an existing expense",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Expense updated successfully",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
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
    summary: "Delete a expense",
    description: "Remove a expense and all its associated data from the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Expense deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Expense not found",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
