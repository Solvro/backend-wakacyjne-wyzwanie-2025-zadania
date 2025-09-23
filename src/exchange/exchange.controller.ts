import { Controller, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ExchangeService } from "./exchange.service";

@ApiTags("exchange")
@Controller("exchange")
export class ExchangeController {
  private readonly logger = new Logger(ExchangeController.name);

  constructor(private readonly exchangeService: ExchangeService) {}

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
    const hasLimit = typeof limit === "string" && limit.trim() !== "";
    const parsed = hasLimit ? Number.parseInt(limit, 10) : Number.NaN;
    const limitNumber = Number.isNaN(parsed) ? 1 : parsed;
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
    const hasLimit = typeof limit === "string" && limit.trim() !== "";
    const parsed = hasLimit ? Number.parseInt(limit, 10) : Number.NaN;
    const limitNumber = Number.isNaN(parsed) ? 10 : parsed;
    return this.exchangeService.getRatesForCurrency(currency, limitNumber);
  }

  @Get("currencies")
  @ApiOperation({ summary: "Get supported currencies" })
  @ApiResponse({
    status: 200,
    description: "Supported currencies retrieved successfully",
  })
  getSupportedCurrencies() {
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
