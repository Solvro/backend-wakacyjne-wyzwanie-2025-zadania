import {
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Validate,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { IsValidCurrencyCodeValidator } from "../../validators/is-valid-currency-code.validator";

export class CreatePaymentDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    example: 100.5,
    description: "Amount in the specified currency",
  })
  amount: number;

  @IsString()
  @Length(3, 3)
  @Validate(IsValidCurrencyCodeValidator)
  @ApiProperty({
    example: "USD",
    description: "Three-letter ISO currency code (e.g., USD, EUR, GBP)",
  })
  currencyCode: string;
}
