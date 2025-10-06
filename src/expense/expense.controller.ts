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
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { ResponseExpenseDto } from "./dto/response-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("Expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Created a new expense",
  })
  @ApiCreatedResponse({
    description: "Created a new expense",
  })
  @ApiResponse({
    status: 201,
    description: "Created a new expense",
    type: CreateExpenseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid expense data",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Returning all expenses",
  })
  @ApiResponse({
    status: 200,
    description: "Expenses returned",
  })
  @ApiResponse({
    status: 404,
    description: "Expenses not found",
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Found an expense with given id",
  })
  @ApiResponse({
    status: 200,
    description: "Expense found",
    type: ResponseExpenseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  async findOne(@Param("id") id: string) {
    return await this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Updated an expense with given id",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated",
    type: UpdateExpenseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expenses not found",
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deleted an expense with given id",
  })
  @ApiResponse({
    status: 200,
    description: "Expense deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Expenses not found",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
