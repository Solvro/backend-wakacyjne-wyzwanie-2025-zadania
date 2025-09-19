import { Role } from "@prisma/client";

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
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { CurrencyService } from "./currency.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@ApiTags("Currency")
@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "tworzy nowy zapis kursu walut" })
  @ApiOkResponse({
    description: "dany zapis został stworzony ",
    type: CreateCurrencyDto,
  })
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @ApiOperation({ summary: "zwraca listę wszystkich zapisów kursów " })
  @ApiOkResponse({ description: "Zwrócono wszystkie kursy " })
  async findAll() {
    return this.currencyService.findAll();
  }
  //nad tym jeszcze pomyśleć może być że zwraca wszystkie kursu z danego albo ostatni po nazwie
  @Get(":id")
  @ApiOperation({ summary: "zwraca zapis kursu od daty??? " })
  @ApiOkResponse({ description: "Zwrócono wszystkie kursy " })
  async findOne(@Param("id") id: string) {
    return this.currencyService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "uaktualnia dany kurs po nazwie i po dacie " })
  @ApiOkResponse({ description: "Zwrócono wszystkie kursy " })
  async update(
    @Param("id") id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "zwraca listę wszystkich zapisów kursów " })
  @ApiOkResponse({ description: "Zwrócono wszystkie kursy " })
  async remove(@Param("id") id: string) {
    return this.currencyService.remove(+id);
  }
}
