import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { Public } from "../common/decorators/public.decorator";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Get all expenses" })
  @ApiOkResponse({ description: "List all expenses" })
  @ApiBadRequestResponse({ description: "Invalid query" })
  async findAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Get specific expense" })
  @ApiOkResponse({ description: "Get one expense" })
  @ApiNotFoundResponse({ description: "Expense not found" })
  @ApiBadRequestResponse({ description: "Invalid query" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiCreatedResponse({ description: "Created expense" })
  @ApiNotFoundResponse({ description: "Participant not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async create(@Body() dto: CreateExpenseDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update expense" })
  @ApiOkResponse({ description: "Updated expense" })
  @ApiNotFoundResponse({ description: "Expense or participant not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete expense" })
  @ApiOkResponse({ description: "Deleted expense" })
  @ApiNotFoundResponse({ description: "Expense not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
