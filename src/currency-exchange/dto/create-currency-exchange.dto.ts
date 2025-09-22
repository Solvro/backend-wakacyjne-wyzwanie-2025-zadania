import { Currency } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyExchangeDto {
  @ApiProperty()
  currency: Currency;

  @ApiProperty()
  exchange: number;
}
