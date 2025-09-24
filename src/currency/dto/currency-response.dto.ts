/* eslint-disable @darraghor/nestjs-typed/api-enum-property-best-practices */
import { ApiProperty } from "@nestjs/swagger";

import { Currency } from "../currency.enum";

export class CurrencyResponseDto {
  @ApiProperty({ enum: Currency })
  code: Currency;

  @ApiProperty({ example: 4.25 })
  rate: number;

  @ApiProperty({ example: "2025-09-21T15:00:00.000Z" })
  updatedAt: Date;
}
