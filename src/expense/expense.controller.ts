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
    summary: "Created a new expense",
    description: "Added a expense",
  })
  @ApiResponse({
    status: 201,
    description: "Participant expense",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Returning all expenses",
    description: "Returned all expenses!",
  })
  @ApiResponse({
    status: 201,
    description: "Expenses returned",
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Found an expense with given id",
    description: "Found an expense with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Expense found!",
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Updated an expense with given id",
    description: "Updated an expense with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Expense updated!",
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Deleted an expense with given id",
    description: "Deleted an expense with given id",
  })
  @ApiResponse({
    status: 201,
    description: "Expense deleted!",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
