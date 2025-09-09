import type { TripStatus } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsAfterDate, IsFutureDate } from "../../validators";

export class CreateTripDto {
  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2025",
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: "Trip name must be a string" })
  @MinLength(1, { message: "Trip name cannot be empty" })
  @MaxLength(100, { message: "Trip name must not exceed 100 characters" })
  name: string;

  @ApiPropertyOptional({
    description: "Description of the trip",
    example: "A wonderful summer vacation to the mountains",
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: "Description must be a string" })
  @MaxLength(500, { message: "Description must not exceed 500 characters" })
  description?: string;

  @ApiPropertyOptional({
    description: "Status of the trip",
    enum: ["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"],
    example: "PLANNED",
  })
  @IsOptional()
  @IsEnum(["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"], {
    message: "Status must be one of: PLANNED, ACTIVE, COMPLETED, CANCELLED",
  })
  status?: TripStatus;

  @ApiProperty({
    description: "Start date of the trip (YYYY-MM-DD format)",
    example: "2025-07-01",
  })
  @IsDateString(
    {},
    { message: "Start date must be a valid date in YYYY-MM-DD format" },
  )
  @IsFutureDate({ message: "Start date must be today or in the future" })
  startDate: string;

  @ApiProperty({
    description: "End date of the trip (YYYY-MM-DD format)",
    example: "2025-07-15",
  })
  @IsDateString(
    {},
    { message: "End date must be a valid date in YYYY-MM-DD format" },
  )
  @IsFutureDate({ message: "End date must be today or in the future" })
  @IsAfterDate("startDate", { message: "End date must be after start date" })
  endDate: string;

  @ApiPropertyOptional({
    description: "Budget for the trip in cents",
    example: 150_000,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: "Budget must be a number" })
  @IsPositive({ message: "Budget must be a positive number" })
  budget?: number;
}

export class UpdateTripDto {
  @ApiPropertyOptional({
    description: "Name of the trip",
    example: "Summer Vacation 2025",
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: "Trip name must be a string" })
  @MinLength(1, { message: "Trip name cannot be empty" })
  @MaxLength(100, { message: "Trip name must not exceed 100 characters" })
  name?: string;

  @ApiPropertyOptional({
    description: "Description of the trip",
    example: "A wonderful summer vacation to the mountains",
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: "Description must be a string" })
  @MaxLength(500, { message: "Description must not exceed 500 characters" })
  description?: string;

  @ApiPropertyOptional({
    description: "Status of the trip",
    enum: ["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"],
    example: "PLANNED",
  })
  @IsOptional()
  @IsEnum(["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"], {
    message: "Status must be one of: PLANNED, ACTIVE, COMPLETED, CANCELLED",
  })
  status?: TripStatus;

  @ApiPropertyOptional({
    description: "Start date of the trip (YYYY-MM-DD format)",
    example: "2025-07-01",
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: "Start date must be a valid date in YYYY-MM-DD format" },
  )
  startDate?: string;

  @ApiPropertyOptional({
    description: "End date of the trip (YYYY-MM-DD format)",
    example: "2025-07-15",
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: "End date must be a valid date in YYYY-MM-DD format" },
  )
  endDate?: string;

  @ApiPropertyOptional({
    description: "Budget for the trip in cents",
    example: 150_000,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: "Budget must be a number" })
  @IsPositive({ message: "Budget must be a positive number" })
  budget?: number;
}

export class UpdateTripStatusDto {
  @ApiProperty({
    description: "Status of the trip",
    enum: ["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"],
    example: "ACTIVE",
  })
  @IsEnum(["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"], {
    message: "Status must be one of: PLANNED, ACTIVE, COMPLETED, CANCELLED",
  })
  status: TripStatus;
}
