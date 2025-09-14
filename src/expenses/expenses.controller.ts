import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/role/role.decorator";
import { RoleGuard } from "../auth/role/role.guard";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({
    status: 201,
    description: "Expense created successfully.",
    type: ExpenseResponseDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIP_COORDINATOR)
  @Post()
  async create(@Body() dto: CreateExpenseDto): Promise<ExpenseResponseDto> {
    return await this.service.create(dto);
  }

  @ApiOperation({ summary: "Get all expenses" })
  @ApiResponse({
    status: 200,
    description: "List of all expenses.",
    type: [ExpenseResponseDto],
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<ExpenseResponseDto[]> {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: "Get expense by ID" })
  @ApiResponse({
    status: 200,
    description: "Expense found.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIP_COORDINATOR)
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ExpenseResponseDto | null> {
    return await this.service.findOne(id);
  }

  @ApiOperation({ summary: "Delete expense by ID" })
  @ApiResponse({
    status: 200,
    description: "Expense deleted successfully.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIP_COORDINATOR)
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ExpenseResponseDto> {
    return await this.service.remove(id);
  }

  @ApiOperation({ summary: "Update expense by ID" })
  @ApiResponse({
    status: 200,
    description: "Expense updated successfully.",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Expense not found." })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIP_COORDINATOR)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    return await this.service.update(id, dto);
  }
}
