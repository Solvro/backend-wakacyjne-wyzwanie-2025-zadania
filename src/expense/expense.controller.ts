import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/roles.decorator";
import { PaginationDto } from "src/pagination/pagination.dto";
import { ParticipantMetadata } from "src/participant/dto/participant-metadata.dto";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new expense",
    description: "Add a new expense to the trip",
  })
  @ApiResponse({
    status: 201,
    description: "Expense created",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  @UseGuards(AuthGuard)
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Request() request: { participant: ParticipantMetadata },
  ) {
    const participant_id = request.participant.participant_id;
    return this.expenseService.create(createExpenseDto, participant_id);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve the list of all expenses",
  })
  @ApiResponse({
    status: 200,
    description: "List of all expenses",
    type: [CreateExpenseResponseDto],
  })
  @UseGuards(AuthGuard)
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.expenseService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrieve a single expense by its unique ID",
  })
  @ApiResponse({
    status: 200,
    description: "Expense found",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  @UseGuards(AuthGuard)
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update expense by ID",
    description: "Modify an existing expense",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  @UseGuards(AuthGuard)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete expense by ID",
    description: "Remove an expense from the trip",
  })
  @ApiResponse({
    status: 200,
    description: "Expense removed",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
