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
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create expense",
    description: "Creates a new expense",
  })
  @ApiResponse({
    status: 201,
    description: "The expense has been successfully created.",
    type: CreateExpenseDto,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieves all expenses",
  })
  @ApiResponse({
    status: 200,
    description: "The expenses have been successfully retrieved.",
    type: [CreateExpenseDto],
  })
  @ApiResponse({ status: 404, description: "No expenses found." })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrieves a single expense by its ID",
  })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully retrieved.",
    type: CreateExpenseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update expense by ID",
    description: "Updates a single expense by its ID",
  })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully updated.",
    type: UpdateExpenseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete expense by ID",
    description: "Deletes a single expense by its ID",
  })
  @ApiResponse({
    status: 204,
    description: "The expense has been successfully deleted.",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
