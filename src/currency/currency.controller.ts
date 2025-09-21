/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Currency } from "./currency.enum";
import { CurrencyService } from "./currency.service";
import { CreateCurrencyRateDto } from "./dto/create-currency.dto";
import { CurrencyResponseDto } from "./dto/currency-response.dto";

@ApiTags("currencies")
@Controller("currencies")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({ summary: "Create or update a currency rate" })
  @ApiResponse({ status: 201, type: CurrencyResponseDto })
  async create(@Body() dto: CreateCurrencyRateDto) {
    return this.currencyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all currency rates" })
  @ApiResponse({ status: 200, type: [CurrencyResponseDto] })
  async findAll() {
    return this.currencyService.findAll();
  }

  @Get(":code")
  @ApiOperation({ summary: "Get a single currency rate" })
  @ApiParam({ name: "code", enum: Currency })
  @ApiResponse({ status: 200, type: CurrencyResponseDto })
  async findOne(@Param("code") code: Currency) {
    return this.currencyService.findOne(code);
  }
}
