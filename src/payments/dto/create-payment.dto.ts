import { IsInt, IsNumber, IsPositive, Validate } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Currency } from "../../validators/valid-currency.validator";

export class CreatePaymentDTO {
  @ApiProperty({ example: "USD" })
  @Validate(Currency)
  currency: string;

  @ApiProperty({ example: 55.5 })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  participant_id: number;
}
