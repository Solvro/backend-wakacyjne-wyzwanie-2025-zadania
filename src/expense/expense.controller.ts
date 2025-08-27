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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create expense",
    description: "Create a new expense with the provided details.",
  })
  @ApiResponse({
    status: 201,
    description: "The expense has been created.",
    type: CreateExpenseDto,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve a list of all expenses.",
  })
  @ApiResponse({
    status: 200,
    description: "A list of expenses.",
    type: [CreateExpenseDto],
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrieve a specific expense by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "The expense with the specified ID.",
    type: CreateExpenseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update expense",
    description: "Update an existing expense with the provided details.",
  })
  @ApiResponse({
    status: 200,
    description: "The expense has been updated.",
    type: UpdateExpenseDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete expense",
    description: "Delete an expense by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "The expense has been deleted.",
    type: CreateExpenseDto,
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
