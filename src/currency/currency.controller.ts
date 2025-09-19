import { Currency } from "@prisma/client";

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CurrencyService } from "./currency.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";

@Controller("currency")
@ApiTags("currencies")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({
    summary: "Creates a new exchange rate - currency pair",
    description:
      "Given an currency enum and its exchange rate, saves the pair with a timestamp",
  })
  @ApiResponse({
    status: 201,
    description: "currency created",
  })
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @ApiOperation({
    summary: "Returns all currency exchange rates",
  })
  @ApiResponse({
    status: 201,
    description: "Request successfull",
  })
  async findAll() {
    return await this.currencyService.findAll();
  }

  @Get(":currency")
  @ApiOperation({
    summary: "Returns a newest exchange rate for specified currency",
  })
  @ApiResponse({
    status: 201,
    description: "Request successfull",
  })
  async findOneNewestCurrency(@Param("currency") currency: Currency) {
    return this.currencyService.findByCurrency(currency);
  }
}
