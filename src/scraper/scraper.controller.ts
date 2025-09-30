import { Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ScraperService } from "./scraper.service";

@Controller("scraper")
@ApiTags("scrapers")
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  @ApiOperation({
    summary: "Get currencies rates",
    description:
      "Initiate scraping process to fetch data from the web and return 3 currencies rates",
  })
  @ApiResponse({
    status: 200,
    description: "Scraping completed successfully",
  })
  async scrape() {
    return this.scraperService.scraping();
  }

  @Post("store")
  @ApiOperation({
    summary: "Store currencies rates",
    description: "Store rates in the database (Rate table)",
  })
  @ApiResponse({
    status: 200,
    description: "Storing completed successfully",
  })
  async scrapeAndStore() {
    return this.scraperService.storeRates();
  }
}
