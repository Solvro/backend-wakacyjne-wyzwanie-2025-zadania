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
import { GetExpenseDto } from "./dto/get-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new expense",
    description:
      "Add an expense to already existing trip and assigns a participant as a one who payed for this expense",
  })
  @ApiResponse({
    status: 201,
    description: "Expense added",
    type: GetExpenseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip or payingParticipant with a given Id does not exist",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Get a full list of all expenses in a system",
  })
  @ApiResponse({
    status: 200,
    description: "List of expenses retrieved",
    type: GetExpenseDto,
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by Id",
    description: "Get details of an expense with a given Id",
  })
  @ApiResponse({
    status: 200,
    description: "Expense retrieved",
    type: GetExpenseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense with a given Id does not exist",
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update an expense by Id",
    description: "Update details of an expense with a given Id",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated",
    type: GetExpenseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip or payingParticipant with a given Id does not exist",
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Remove an expense by Id",
    description: "Remove data of an expense with a given Id",
  })
  @ApiResponse({
    status: 200,
    description: "Expense deleted",
    type: GetExpenseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense with a given Id does not exist",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
