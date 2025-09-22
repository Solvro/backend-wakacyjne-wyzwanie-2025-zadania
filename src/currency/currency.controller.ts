import { Controller, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { Roles } from "../common/decorators/roles.decorator";
import { CurrencyService } from "./currency.service";
import { RateScraperService } from "./rate-scraper.service";

@ApiTags("admin/currency")
@Controller("admin/currency")
export class CurrencyController {
  constructor(
    private scraper: RateScraperService,
    private currency: CurrencyService,
  ) {}

  @Post("refresh")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Create a new trip" })
  @ApiCreatedResponse({ description: "Created trip" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async refresh() {
    const rates = await this.scraper.fetchRates();
    for (const [code, rate] of Object.entries(rates)) {
      await this.currency.upsertRate(code, rate);
    }
    return { ok: true, rates };
  }
}
