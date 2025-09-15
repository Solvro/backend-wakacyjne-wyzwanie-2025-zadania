import {
  IsInt,
  IsNumber,
  IsObject,
  IsPositive,
  Validate,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Currency } from "../../validators/valid-currency.validator";

export class CreatePaymentResponseDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Validate(Currency)
  currency: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  amount_pln: number;

  @ApiProperty({ type: String, format: "date-time" })
  @IsObject()
  created_at: Date;

  @IsNumber()
  @ApiProperty()
  @IsInt()
  @IsPositive()
  participant_id: number;
}
