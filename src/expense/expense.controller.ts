import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/role.decorator";
import { RoleGuard } from "src/auth/roles/role.guard";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  ApiTags,
} from "@nestjs/swagger";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

@ApiTags("Expenses")
@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tworzy nowy wydatek" })
  @ApiCreatedResponse({
    description: "Utworzono nowy wydatek",
    type: CreateExpenseDto,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: "Pobiera listę wszystkich wydatków" })
  @ApiOkResponse({
    description: "Zwraca listę wydatków",
    type: [CreateExpenseDto],
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Pobiera wydatek po ID" })
  @ApiOkResponse({
    description: "Zwraca konkretny wydatek",
    type: CreateExpenseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Aktualizuje dane wydatku" })
  @ApiOkResponse({
    description: "Zaktualizowano wydatek",
    type: UpdateExpenseDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Usuwa wydatek" })
  @ApiNoContentResponse({ description: "Wydatek został usunięty" })
  async remove(@Param("id") id: string) {
    return this.expenseService.remove(+id);
  }
}
