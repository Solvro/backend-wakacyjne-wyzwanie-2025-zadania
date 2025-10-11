import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ForexRateDto {
  @ApiProperty({
    description: "Currency code (ISO 4217)",
    example: "USD",
    minLength: 3,
    maxLength: 3,
  })
  @IsString({ message: "Currency name must be a string" })
  @MinLength(3, { message: "Currency name must be exactly 3 characters" })
  @MaxLength(3, { message: "Currency name must be exactly 3 characters" })
  currencyName: string;

  @ApiProperty({
    description: "Exchange rate to PLN",
    example: 4.1234,
  })
  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: "Rate must be a number with up to 4 decimal places" },
  )
  @IsPositive({ message: "Rate must be a positive number" })
  rate: number;

  @ApiPropertyOptional({
    description: "Date when the rate was fetched",
    example: "2025-09-20T10:30:00.000Z",
  })
  @IsOptional()
  @IsDateString({}, { message: "FetchedAt must be a valid date string" })
  fetchedAt?: string;
}

export class FetchRatesResponseDto {
  @ApiProperty({
    description: "Number of rates successfully fetched and saved",
    example: 3,
  })
  @IsNumber()
  @IsPositive()
  fetchedCount: number;

  @ApiProperty({
    description: "Array of fetched currency rates",
    type: [ForexRateDto],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ForexRateDto)
  rates: ForexRateDto[];

  @ApiProperty({
    description: "Timestamp of the fetch operation",
    example: "2025-09-20T10:30:00.000Z",
  })
  @IsDateString()
  fetchedAt: string;
}

// NBP API response types for internal use
export interface NBPRate {
  currency: string;
  code: string;
  mid: number;
}

export interface NBPResponse {
  table: string;
  no: string;
  effectiveDate: string;
  rates: NBPRate[];
}
