import { Controller, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ExchangeScheduler } from "./exchange.scheduler";
import { ExchangeService } from "./exchange.service";

@ApiTags("exchange")
@Controller("exchange")
export class ExchangeController {
  private readonly logger = new Logger(ExchangeController.name);

  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly exchangeScheduler: ExchangeScheduler,
  ) {}

  @Get("rates")
  @ApiOperation({ summary: "Get latest exchange rates" })
  @ApiResponse({
    status: 200,
    description: "Latest exchange rates retrieved successfully",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Number of recent rates to return per currency",
  })
  async getLatestRates(@Query("limit") limit?: string) {
    const limitNumber = limit ? Number.parseInt(limit, 10) : 1;
    return this.exchangeService.getLatestRates(limitNumber);
  }

  @Get("rates/:currency")
  @ApiOperation({ summary: "Get exchange rates for specific currency" })
  @ApiResponse({
    status: 200,
    description: "Exchange rates for currency retrieved successfully",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Number of recent rates to return",
  })
  async getRatesForCurrency(
    @Param("currency") currency: string,
    @Query("limit") limit?: string,
  ) {
    const limitNumber = limit ? Number.parseInt(limit, 10) : 10;
    return this.exchangeService.getRatesForCurrency(currency, limitNumber);
  }

  @Get("currencies")
  @ApiOperation({ summary: "Get supported currencies" })
  @ApiResponse({
    status: 200,
    description: "Supported currencies retrieved successfully",
  })
  async getSupportedCurrencies() {
    return {
      currencies: this.exchangeService.getSupportedCurrencies(),
    };
  }

  @Post("update")
  @ApiOperation({ summary: "Manually trigger exchange rates update" })
  @ApiResponse({
    status: 200,
    description: "Exchange rates updated successfully",
  })
  async updateRates() {
    this.logger.log("Manual exchange rates update triggered via API");
    const rates = await this.exchangeService.updateExchangeRates();
    return {
      message: "Exchange rates updated successfully",
      updatedRates: rates.length,
      rates,
    };
  }

  @Post("update/specific")
  @ApiOperation({ summary: "Update exchange rates for specific currencies" })
  @ApiResponse({
    status: 200,
    description: "Specific exchange rates updated successfully",
  })
  @ApiQuery({
    name: "currencies",
    required: true,
    description: "Comma-separated list of currency codes",
  })
  async updateSpecificRates(@Query("currencies") currencies: string) {
    const currencyList = currencies
      .split(",")
      .map((c) => c.trim().toUpperCase());
    this.logger.log(
      `Manual update for specific currencies triggered: ${currencyList.join(", ")}`,
    );

    const rates = await this.exchangeService.updateSpecificRates(currencyList);
    return {
      message: "Specific exchange rates updated successfully",
      updatedRates: rates.length,
      currencies: currencyList,
      rates,
    };
  }
}
