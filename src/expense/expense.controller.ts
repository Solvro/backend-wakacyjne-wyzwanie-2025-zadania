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
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
@ApiTags("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: "Creates a new expense",
    description:
      "Adds a new expense, you need to supply a name, description (optional), value, date and trip_participant_id",
  })
  @ApiResponse({
    status: 201,
    description: "Expense created",
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Returns all expenses",
    description: "Returns all expenses",
  })
  @ApiResponse({
    status: 200,
    description: "Request successful",
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Returns an expense with given id",
    description: "Given an id, returns an expense record with that id",
  })
  @ApiResponse({
    status: 200,
    description: "Request successful",
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Updates an expense",
    description: "Given an id, updates that record with the given data",
  })
  @ApiResponse({
    status: 200,
    description: "Patch successful",
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deletes an expense with given id",
    description: "Given an id, deletes an expense record with that id",
  })
  @ApiResponse({
    status: 200,
    description: "Resource deleted",
  })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
