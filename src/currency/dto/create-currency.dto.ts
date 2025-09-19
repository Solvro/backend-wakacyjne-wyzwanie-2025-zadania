import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, Length, Min } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyDto {
  @ApiProperty()
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  value: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  timestamp: Date;
}
