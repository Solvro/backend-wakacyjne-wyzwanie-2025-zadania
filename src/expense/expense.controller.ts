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
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  private parseIntParam(value: string | undefined): number | undefined {
    if (value == null) {
      return undefined;
    }

    const parsed = Number.parseInt(value, 10);
    return parsed;
  }

  private parseOrderBy(orderBy: string | undefined) {
    if (orderBy !== undefined) {
      const [field, direction] = orderBy.split(":");

      return {
        [field]: direction.toLowerCase() || "asc",
      };
    }
  }

  @Post()
  @ApiOperation({
    summary: "Create a new expense",
    description: "Add an expense to which you supply trip and participant",
  })
  @ApiResponse({
    status: 201,
    description: "Expense created",
    type: CreateExpenseResponseDto,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve a list of expenses",
  })
  @ApiResponse({
    status: 200,
    description: "List of expenses retrieved successfully",
    type: [CreateExpenseResponseDto],
  })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({
    name: "orderBy",
    required: false,
    description: "Order by field:direction [amount:desc, createdAt:asc]",
  })
  async findAll(
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @Query("orderBy") orderBy?: string,
  ) {
    return this.expenseService.findAll({
      skip: this.parseIntParam(skip),
      take: this.parseIntParam(take),
      orderBy: this.parseOrderBy(orderBy),
    });
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrieve detailed information about an expense",
  })
  @ApiResponse({
    status: 200,
    description: "Expense details retrieved successfully",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update expense details",
    description: "Change information for an existing expense",
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated successfully",
    type: CreateExpenseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete an expense",
    description: "Remove an expense and its data",
  })
  @ApiResponse({
    status: 200,
    description: "Expense deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }

  @Get("trip/:tripId")
  @ApiOperation({
    summary: "Get expenses by trip",
    description: "Retrieve expenses connected with a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Trip expenses retrieved successfully",
  })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({
    name: "orderBy",
    required: false,
    description: "Order by field:direction [amount:desc, createdAt:asc]",
  })
  async getExpensesByTrip(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @Query("orderBy") orderBy?: string,
  ) {
    return this.expenseService.findExpensesByTrip(tripId, {
      skip: this.parseIntParam(skip),
      take: this.parseIntParam(take),
      orderBy: this.parseOrderBy(orderBy),
    });
  }

  @Post(":expenseId/trip/:tripId")
  @ApiOperation({
    summary: "Add expense to trip",
    description: "Connect an expense with a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Expense added to trip successfully",
  })
  async addExpenseToTrip(
    @Param("expenseId", ParseIntPipe) expenseId: number,
    @Param("tripId", ParseIntPipe) tripId: number,
  ) {
    return this.expenseService.addExpenseToTrip(expenseId, tripId);
  }

  @Delete(":expenseId/trip")
  @ApiOperation({
    summary: "Remove expense from trip",
    description: "Remove the connection between an expense and a trip",
  })
  @ApiResponse({
    status: 200,
    description: "Expense removed from trip successfully",
  })
  async removeExpenseFromTrip(
    @Param("expenseId", ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.removeExpenseFromTrip(expenseId);
  }

  @Get("participant/:participantId")
  @ApiOperation({
    summary: "Get expenses by participant",
    description: "Retrieve expenses connected with a participant",
  })
  @ApiResponse({
    status: 200,
    description: "Participant expenses retrieved successfully",
  })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({
    name: "orderBy",
    required: false,
    description: "Order by field:direction [amount:desc, createdAt:asc]",
  })
  async getExpensesByParticipant(
    @Param("participantId", ParseIntPipe) participantId: number,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @Query("orderBy") orderBy?: string,
  ) {
    return this.expenseService.findExpensesByParticipant(participantId, {
      skip: this.parseIntParam(skip),
      take: this.parseIntParam(take),
      orderBy: this.parseOrderBy(orderBy),
    });
  }

  @Post(":expenseId/participant/:participantId")
  @ApiOperation({
    summary: "Add expense to participant",
    description: "Connect an expense with a participant",
  })
  @ApiResponse({
    status: 200,
    description: "Expense added to participant successfully",
  })
  async addExpenseToParticipant(
    @Param("expenseId", ParseIntPipe) expenseId: number,
    @Param("participantId", ParseIntPipe) participantId: number,
  ) {
    return this.expenseService.addExpenseToParticipant(
      expenseId,
      participantId,
    );
  }

  @Delete(":expenseId/participant")
  @ApiOperation({
    summary: "Remove expense from participant",
    description: "Remove the connection between an expense and a participant",
  })
  @ApiResponse({
    status: 200,
    description: "Expense removed from participant successfully",
  })
  async removeExpenseFromParticipant(
    @Param("expenseId", ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.removeExpenseFromParticipant(expenseId);
  }
}
