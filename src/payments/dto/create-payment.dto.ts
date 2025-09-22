import { Currency } from "@prisma/client";
import { Allow, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Allow()
  curency: Currency;

  @ApiProperty()
  @IsNumber()
  tripId: number;
}
