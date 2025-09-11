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
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

@ApiTags("expenses")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Dodaj nowy wydatek" })
  @ApiCreatedResponse({
    description: "Utworzono wydatek",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 400, description: "Błędne dane wejściowe" })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Pobierz wszystkie wydatki" })
  @ApiOkResponse({
    description: "Zwraca listę wydatków",
    type: [ExpenseResponseDto],
  })
  async findAll() {
    return this.expensesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Pobierz wydatek" })
  @ApiOkResponse({ description: "Zwraca wydatek", type: ExpenseResponseDto })
  @ApiResponse({
    status: 404,
    description: "Nie znaleziono wydatku",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Aktualizuj wydatek" })
  @ApiOkResponse({
    description: "Zaktualizowano wydatek",
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Nie znaleziono wydatku" })
  @ApiResponse({ status: 400, description: "Błędne dane wejściowe" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Usuń wydatek" })
  @ApiNoContentResponse({ description: "Usunięto wydatek" })
  @ApiResponse({ status: 404, description: "Nie znaleziono wydatku" })
  @HttpCode(204)
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.expensesService.remove(id);
  }
}
