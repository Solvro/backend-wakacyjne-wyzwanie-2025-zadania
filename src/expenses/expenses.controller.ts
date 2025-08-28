import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { TripsService } from "../trips/trips.service";
import { ExpenseDto } from "./dto/expense.dto";
import { ExpensesService } from "./expenses.service";

@ApiTags("expenses")
@Controller("trips/:tripId/expenses")
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly tripsService: TripsService,
  ) {}

  // GET /trips/:tripId/expenses - Get all expenses for a trip
  @Get()
  @ApiOperation({
    summary: "Get trip expenses",
    description: "Get all expenses for a specific trip",
  })
  @ApiParam({ name: "tripId", description: "Trip ID", type: "number" })
  @ApiOkResponse({
    description: "List of trip expenses retrieved successfully",
    example: [
      {
        id: 1,
        title: "Hotel accommodation",
        description: "3 nights at Grand Hotel",
        amount: 25_000,
        category: "ACCOMMODATION",
        date: "2025-07-05",
        participantId: 1,
        tripId: 1,
        createdAt: "2025-08-24T10:00:00Z",
        updatedAt: "2025-08-24T10:00:00Z",
      },
    ],
  })
  async getTripExpenses(@Param("tripId", ParseIntPipe) tripId: number) {
    return this.tripsService.getTripExpenses(tripId);
  }

  // POST /trips/:tripId/expenses - Add expense to trip
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Add expense to trip",
    description: "Add a new expense to a specific trip",
  })
  @ApiParam({ name: "tripId", description: "Trip ID", type: "number" })
  @ApiBody({
    type: ExpenseDto,
    description: "Expense creation data",
    examples: {
      example1: {
        summary: "Hotel expense",
        value: {
          title: "Hotel accommodation",
          description: "3 nights at Grand Hotel",
          amount: 25_000,
          category: "ACCOMMODATION",
          date: "2025-07-05",
          participantId: 1,
        },
      },
      example2: {
        summary: "Restaurant expense",
        value: {
          title: "Dinner at local restaurant",
          description: "Dinner for the group",
          amount: 8500,
          category: "FOOD",
          date: "2025-07-06",
          participantId: 2,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: "Expense added to trip successfully",
    example: {
      id: 1,
      title: "Hotel accommodation",
      description: "3 nights at Grand Hotel",
      amount: 25_000,
      category: "ACCOMMODATION",
      date: "2025-07-05",
      participantId: 1,
      tripId: 1,
      createdAt: "2025-08-24T10:00:00Z",
      updatedAt: "2025-08-24T10:00:00Z",
    },
  })
  async addExpense(
    @Param("tripId", ParseIntPipe) tripId: number,
    @Body() createExpenseDto: ExpenseDto,
  ) {
    return this.expensesService.addExpenseToTrip(tripId, createExpenseDto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update expense",
    description: "Update an existing expense",
  })
  @ApiParam({ name: "id", description: "Expense ID", type: "number" })
  @ApiBody({
    type: ExpenseDto,
    description: "Expense update data",
  })
  @ApiOkResponse({
    description: "Expense updated successfully",
    type: ExpenseDto,
  })
  async updateExpense(
    @Param("id", ParseIntPipe) expenseId: number,
    @Body() updateExpenseDto: ExpenseDto,
  ) {
    return this.expensesService.updateExpense(expenseId, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete expense",
    description: "Delete an existing expense",
  })
  @ApiParam({ name: "id", description: "Expense ID", type: "number" })
  @ApiOkResponse({
    description: "Expense deleted successfully",
  })
  async deleteExpense(@Param("id", ParseIntPipe) expenseId: number) {
    return this.expensesService.deleteExpense(expenseId);
  }
}
