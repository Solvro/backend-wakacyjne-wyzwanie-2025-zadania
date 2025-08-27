import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({
    status: 201,
    description: "The expense has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all expenses" })
  @ApiResponse({ status: 200, description: "Return all expenses." })
  async findAll() {
    return this.expensesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an expense by id" })
  @ApiResponse({ status: 200, description: "Return the expense." })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async findOne(@Param("id") id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an expense" })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an expense" })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async remove(@Param("id") id: string) {
    return this.expensesService.remove(+id);
  }
}
