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
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
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
    summary: "Created a new expense",
    description: "Add and expense to a specific trip and a participant",
  })
  @ApiResponse({
    status: 201,
    description: "Expense created successfully",
    type: CreateExpenseResponseDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth("access-token")
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve a list of all expenses",
  })
  @ApiResponse({
    status: 200,
    description: "List of expenses retrieved successfully",
    type: [CreateExpenseResponseDto],
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get and expense by ID",
    description: "Retrieve details of a specific expense using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Expense details retrieved successfullu",
    type: CreateExpenseResponseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update an expense",
    description: "Modify details of an existing expense using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated successfully",
    type: UpdateExpenseDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth("access-token")
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete an expense",
    description: "Remove an expense using its ID",
  })
  @ApiResponse({
    status: 204,
    description: "Expense deleted successfully",
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth("access-token")
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
