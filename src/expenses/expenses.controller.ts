import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

@ApiTags("expenses")
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Dodaj nowy wydatek" })
  @ApiCreatedResponse({ description: "Utworzono wydatek" })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Pobierz wszystkie wydatki" })
  @ApiOkResponse({ description: "Zwraca listę wydatków" })
  async findAll() {
    return this.expensesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Pobierz wydatek" })
  @ApiOkResponse({ description: "Zwraca wydatek" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Aktualizuj wydatek" })
  @ApiOkResponse({ description: "Zaktualizowano wydatek" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Usuń wydatek" })
  @ApiNoContentResponse({ description: "Usunięto wydatek" })
  @HttpCode(204)
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.expensesService.remove(id);
  }
}
