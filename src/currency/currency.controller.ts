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
  @ApiOperation({ summary: "scrape currency from site" })
  @ApiCreatedResponse({ description: "scraped currency from site" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async refresh() {
    const rates = await this.scraper.fetchRates();
    await this.currency.upsertMany(rates);
    return { ok: true, rates };
  }
}
