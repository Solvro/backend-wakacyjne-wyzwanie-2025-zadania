import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CurrencyService } from "./currency.service";
import { CurrencyResponse } from "./dto/currency-response.dto";

@Controller("currency")
@ApiTags("currency")
export class CurrencyController {
  constructor(private readonly currencyservice: CurrencyService) {}

  @Get("/")
  @ApiOperation({
    summary: "Get all currency rates",
    description: "Get all of the historically collected currency rates",
  })
  @ApiResponse({
    status: 200,
    description:
      "Retrieved all of the historically collected currency rates for available currencies",
    type: CurrencyResponse,
  })
  async findAll() {
    return this.currencyservice.findAll();
  }
}
