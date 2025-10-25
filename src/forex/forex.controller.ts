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
    @Query("currency") currency: string,
    @Query("limit", new ParseIntPipe({ optional: true })) limit = 10,
  ): Promise<ForexRateDto[]> {
    // Validate limit
    if (limit < 1 || limit > 100) {
      throw new BadRequestException("Limit must be between 1 and 100");
    }

    return this.forexService.getRatesHistory(currency, limit);
  }

  @Get("schedule/status")
  @ApiOperation({
    summary: "Get schedule status",
    description:
      "Returns information about scheduled tasks for currency rate fetching",
  })
  @ApiResponse({
    status: 200,
    description: "Schedule status retrieved successfully",
    schema: {
      type: "object",
      properties: {
        enabled: { type: "boolean" },
        schedules: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              expression: { type: "string" },
              description: { type: "string" },
              nextRun: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  })
  getScheduleStatus(): {
    enabled: boolean;
    schedules: {
      name: string;
      expression: string;
      description: string;
      nextRun?: string;
    }[];
  } {
    return {
      enabled: true,
      schedules: [
        {
          name: "Daily Morning Fetch",
          expression: "0 9 * * *",
          description:
            "Fetches currency rates every day at 9:00 AM (NBP working hours)",
          nextRun: this.getNextCronTime("0 9 * * *"),
        },
        {
          name: "Weekday Afternoon Fetch",
          expression: "0 14 * * 1-5",
          description:
            "Fetches currency rates on weekdays at 2:00 PM for midday updates",
          nextRun: this.getNextCronTime("0 14 * * 1-5"),
        },
        {
          name: "Weekly Maintenance",
          expression: "0 0 * * 1",
          description:
            "Runs weekly maintenance every Monday at midnight (cleans up old data)",
          nextRun: this.getNextCronTime("0 0 * * 1"),
        },
      ],
    };
  }

  private getNextCronTime(_expression: string): string {
    // This is a simplified implementation
    // In a real application, you might want to use a proper cron parser
    const now = new Date();
    const nextRun = new Date(now);
    nextRun.setDate(nextRun.getDate() + 1); // Simplified: next day
    return nextRun.toISOString();
  }
}
