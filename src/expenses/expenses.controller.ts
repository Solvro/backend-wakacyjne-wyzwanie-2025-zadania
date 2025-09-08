import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({ status: 201, description: "Expense successfully created" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<CreateExpenseDto> {
    return (await this.expensesService.create(
      createExpenseDto,
    )) as CreateExpenseDto;
  }

  @Get()
  @ApiOperation({ summary: "Get all expenses" })
  @ApiResponse({ status: 200, description: "List of all expenses" })
  async findAll(): Promise<CreateExpenseDto[]> {
    return (await this.expensesService.findAll()) as CreateExpenseDto[];
  }

  @Get(":id")
  @ApiOperation({ summary: "Get expense by ID" })
  @ApiParam({ name: "id", description: "Expense ID" })
  @ApiResponse({ status: 200, description: "Expense found" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async findOne(@Param("id") id: string): Promise<CreateExpenseDto> {
    return this.expensesService.findOne(+id) as Promise<CreateExpenseDto>;
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update expense by ID" })
  @ApiParam({ name: "id", description: "Expense ID" })
  @ApiResponse({ status: 200, description: "Expense updated" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<UpdateExpenseDto> {
    return this.expensesService.update(
      +id,
      updateExpenseDto,
    ) as Promise<UpdateExpenseDto>;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete expense by ID" })
  @ApiParam({ name: "id", description: "Expense ID" })
  @ApiResponse({ status: 200, description: "Expense deleted" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async remove(@Param("id") id: string): Promise<{ message: string }> {
    await this.expensesService.remove(+id);
    return { message: "Expense deleted" };
  }
}
