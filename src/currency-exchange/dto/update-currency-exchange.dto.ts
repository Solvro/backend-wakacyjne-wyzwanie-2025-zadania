import { PartialType } from "@nestjs/swagger";

import { CreateCurrencyExchangeDto } from "./create-currency-exchange.dto";

export class UpdateCurrencyExchangeDto extends PartialType(
  CreateCurrencyExchangeDto,
) {}
