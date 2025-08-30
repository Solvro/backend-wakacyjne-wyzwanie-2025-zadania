import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("Expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({
    status: 201,
    description: "The expense has been successfully created.",
    type: CreateExpenseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request. The participant is not part of the trip.",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found. The specified trip or participant does not exist.",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all expenses" })
  @ApiResponse({ status: 200, description: "A list of all expenses." })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single expense by ID" })
  @ApiParam({ name: "id", description: "The ID of the expense to retrieve" })
  @ApiResponse({ status: 200, description: "The requested expense." })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing expense" })
  @ApiParam({ name: "id", description: "The ID of the expense to update" })
  @ApiBody({ type: UpdateExpenseDto })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully updated.",
    type: UpdateExpenseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an expense" })
  @ApiParam({ name: "id", description: "The ID of the expense to delete" })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
