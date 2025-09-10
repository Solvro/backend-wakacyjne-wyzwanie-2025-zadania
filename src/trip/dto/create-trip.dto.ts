import { Transform, Type } from "class-transformer";
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsFutureDate } from "../../validators/future-date.validator";

export class CreateTripDto {
  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2025",
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: "Trip name must be a string" })
  @MinLength(3, { message: "Trip name must be at least 3 characters long" })
  @MaxLength(100, { message: "Trip name cannot exceed 100 characters" })
  name: string;

  @ApiProperty({
    description: "Destination of the trip",
    example: "Kraków",
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: "Destination must be a string" })
  @MinLength(2, { message: "Destination must be at least 2 characters long" })
  @MaxLength(100, { message: "Destination cannot exceed 100 characters" })
  destination: string;

  @ApiProperty({
    description: "Start date of the trip (YYYY-MM-DD, must be today or future)",
    example: "2025-09-15",
  })
  @IsDateString(
    {},
    { message: "Start date must be a valid date string (YYYY-MM-DD)" },
  )
  @IsFutureDate({ message: "Trip start date must be today or in the future" })
  start_date: string;

  @ApiPropertyOptional({
    description: "End date of the trip (YYYY-MM-DD, must be after start date)",
    example: "2025-09-20",
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: "End date must be a valid date string (YYYY-MM-DD)" },
  )
  @IsFutureDate({ message: "Trip end date must be today or in the future" })
  end_date?: string;

  @ApiPropertyOptional({
    description: "Planned budget for the trip (must be positive)",
    example: 1200,
    minimum: 0.01,
  })
  @IsOptional()
  @IsNumber({}, { message: "Budget must be a number" })
  @IsPositive({ message: "Budget must be a positive number" })
  @Type(() => Number)
  budget?: number;
}
