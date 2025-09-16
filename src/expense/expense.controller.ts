import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("expense")
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.GUIDE, Role.ADMIN)
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
  async findOne(@Param("id", ParseIntPipe) id: string) {
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.GUIDE, Role.ADMIN)
  async update(
    @Param("id", ParseIntPipe) id: string,
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.GUIDE, Role.ADMIN)
  async remove(@Param("id", ParseIntPipe) id: string) {
    return this.expenseService.remove(+id);
  }
}
