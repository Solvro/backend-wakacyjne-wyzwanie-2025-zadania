import { Currency } from "@prisma/client";
import { IsEnum, IsNumber, IsPositive } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyDto {
  @ApiProperty()
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  value: number;
}
