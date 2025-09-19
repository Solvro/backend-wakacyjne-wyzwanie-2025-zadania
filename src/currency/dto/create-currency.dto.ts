import { IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyDto {
  @ApiProperty()
  @IsString()
  currencyCode!: string;

  @ApiProperty()
  @IsNumber()
  rate!: number;
}
