import {
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Validate,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { IsValidCurrencyCodeValidator } from "../../validators/is-valid-currency-code.validator";

export class CreateOrUpdateCurrencyDto {
  @IsString()
  @Length(3, 3)
  @Validate(IsValidCurrencyCodeValidator)
  @ApiProperty({
    example: "USD",
    description: "Three-letter ISO currency code (e.g., USD, EUR, GBP)",
  })
  code: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    example: 4.5,
    description: "Exchange rate for the currency against PLN",
  })
  rate: number;
}
