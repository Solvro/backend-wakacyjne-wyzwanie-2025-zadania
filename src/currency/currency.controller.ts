import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/roles.decorator";
import { RoleGuard } from "../auth/roles/roles.guard";
import { CurrencyService } from "./currency.service";
import { CreateCurrencyResponseDto } from "./dto/create-currency-response.dto";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Controller("currency")
@ApiTags("currencies")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Create a currency",
    description:
      "Add a currency to which you can add participants and connect to expenses",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Currency created",
    type: CreateCurrencyResponseDto,
  })
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all currencies",
    description: "Retrieve a list of all currencies in the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of currencies retrieved successfully",
    type: [CreateCurrencyResponseDto],
  })
  async findAll() {
    return this.currencyService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get currency by ID",
    description: "Retrieve detailed information about a specific currency",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Currency details retrieved successfully",
    type: CreateCurrencyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Currency not found",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.currencyService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Update currency details",
    description: "Modify information for an existing currency",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Currency updated successfully",
    type: CreateCurrencyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Currency not found",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currencyService.update(id, updateCurrencyDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Delete a currency",
    description:
      "Remove a currency and all its associated data from the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Currency deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Currency not found",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.currencyService.remove(id);
  }
}
