import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { FetchRatesResponseDto, ForexRateDto } from "./dto/forex.dto";
import { ForexService } from "./forex.service";

@ApiTags("Forex")
@Controller("forex")
export class ForexController {
  constructor(private readonly forexService: ForexService) {}

  @Post("fetch")
  @ApiOperation({
    summary: "Fetch current currency rates",
    description:
      "Fetches current exchange rates for USD, EUR, and GBP from NBP API and saves them to the database",
  })
  @ApiResponse({
    status: 201,
    description: "Currency rates successfully fetched and saved",
    type: FetchRatesResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Failed to fetch currency rates from external API",
  })
  async fetchCurrentRates(): Promise<FetchRatesResponseDto> {
    return this.forexService.fetchCurrentRates();
  }

  @Get("latest")
  @ApiOperation({
    summary: "Get latest currency rates",
    description:
      "Returns the most recent exchange rates for each supported currency from the database",
  })
  @ApiResponse({
    status: 200,
    description: "Latest currency rates retrieved successfully",
    type: [ForexRateDto],
  })
  async getLatestRates(): Promise<ForexRateDto[]> {
    return this.forexService.getLatestRates();
  }

  @Get("history")
  @ApiOperation({
    summary: "Get currency rates history",
    description:
      "Returns historical exchange rates with optional currency filter and limit",
  })
  @ApiQuery({
    name: "currency",
    required: false,
    description: "Currency code to filter by (e.g., USD, EUR, GBP)",
    example: "USD",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Maximum number of records to return",
    example: 10,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "Currency rates history retrieved successfully",
    type: [ForexRateDto],
  })
  @ApiBadRequestResponse({
    description: "Invalid query parameters or database error",
  })
  async getRatesHistory(
    @Query("currency") currency?: string,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<ForexRateDto[]> {
    // Validate currency code if provided
    if (currency !== undefined && !/^[A-Z]{3}$/u.test(currency.toUpperCase())) {
      throw new BadRequestException(
        "Currency code must be a 3-letter ISO code (e.g., USD, EUR, GBP)",
      );
    }

    // Validate limit
    const validatedLimit = limit ?? 10;
    if (validatedLimit < 1 || validatedLimit > 100) {
      throw new BadRequestException("Limit must be between 1 and 100");
    }

    return this.forexService.getRatesHistory(currency, validatedLimit);
  }
}
