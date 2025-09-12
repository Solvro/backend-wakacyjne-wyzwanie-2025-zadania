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

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: string) {
    return this.expenseService.remove(+id);
  }
}
