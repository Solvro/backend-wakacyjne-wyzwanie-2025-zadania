import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCurrencyRateDto {
  @ApiProperty({ example: "USD", description: "Currency code" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 4.35, description: "Conversion rate to PLN" })
  @IsNumber()
  @IsPositive()
  rateToPLN: number;

  @ApiPropertyOptional({
    example: "US Dollar",
    description: "Name of the currency",
  })
  @IsOptional()
  @IsString()
  name?: string;
}
