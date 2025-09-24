import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CurrenciesService } from "./currencies.service";
import { CurrencyScraperService } from "./currency-scraper.service";
import { CreateOrUpdateCurrencyDto } from "./dto/create-or-update-currency.dto";
import { CurrencyResponseDto } from "./dto/currency-response.dto";

@ApiTags("currencies")
@Controller("currencies")
export class CurrenciesController {
  constructor(
    private readonly currenciesService: CurrenciesService,
    private readonly currencyScraperService: CurrencyScraperService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all currencies" })
  @ApiResponse({
    status: 200,
    description: "List of all currencies retrieved successfully",
    type: CurrencyResponseDto,
    isArray: true,
  })
  async getAll() {
    return this.currenciesService.getAll();
  }

  @Get(":code")
  @ApiOperation({ summary: "Get currency by code" })
  @ApiResponse({
    status: 200,
    description: "Currency retrieved successfully",
    type: CurrencyResponseDto,
  })
  @ApiResponse({ status: 404, description: "Currency not found" })
  async getOne(@Param("code") code: string) {
    return this.currenciesService.getOne(code.toUpperCase());
  }

  @Post()
  @ApiOperation({ summary: "Create or update currency" })
  @ApiResponse({
    status: 201,
    description: "Currency created or updated successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid currency code" })
  async createOrUpdate(@Body() body: CreateOrUpdateCurrencyDto) {
    return this.currenciesService.upsertCurrency(
      body.code.toUpperCase(),
      body.rate,
    );
  }
}
