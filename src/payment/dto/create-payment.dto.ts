import { IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @IsNumber()
  @ApiProperty()
  expense: number;
}
