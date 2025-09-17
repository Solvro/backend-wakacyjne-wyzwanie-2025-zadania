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

import { Roles } from "../auth/roles";
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
    summary: "Create a new expense",
    description: "Add a expense that is can be assigned to a trip participant",
  })
  @ApiResponse({
    status: 201,
    description: "Expense created",
  })
  @Roles("USER")
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve a list of all expenses in the system",
  })
  @ApiResponse({
    status: 200,
    description: "List of expenses retrieved successfully",
  })
  @Roles("USER")
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrieve detailed information about a specific expense",
  })
  @ApiResponse({
    status: 200,
    description: "Expense details retrieved successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  @Roles("USER")
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update expense details",
    description: "Modify information for an existing expense",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  @Roles("USER")
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
    status: 200,
    description: "Expense deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  @Roles("USER")
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
