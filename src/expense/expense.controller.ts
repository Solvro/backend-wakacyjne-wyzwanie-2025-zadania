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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Get()
  @ApiOkResponse({ description: "List all expenses" })
  async findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Get one expense" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: "Created expense" })
  async create(@Body() dto: CreateExpenseDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "Updated expense" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "Deleted expense" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
