import type { ExpenseCategory } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ExpenseDto {
  @ApiProperty({
    description: "Title of the expense",
    example: "Hotel accommodation",
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: "Title must be a string" })
  @MinLength(1, { message: "Title cannot be empty" })
  @MaxLength(100, { message: "Title must not exceed 100 characters" })
  title: string;

  @ApiPropertyOptional({
    description: "Description of the expense",
    example: "3 nights at Grand Hotel",
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: "Description must be a string" })
  @MaxLength(500, { message: "Description must not exceed 500 characters" })
  description?: string;

  @ApiProperty({
    description: "Amount of the expense in cents",
    example: 25_000,
    minimum: 1,
  })
  @IsNumber({}, { message: "Amount must be a number" })
  @IsPositive({ message: "Amount must be a positive number" })
  @IsInt({ message: "Amount must be an integer (in cents)" })
  amount: number;

  @ApiProperty({
    description: "Category of the expense",
    enum: ["ACCOMMODATION", "FOOD", "TRANSPORT", "ENTERTAINMENT", "OTHER"],
    example: "ACCOMMODATION",
  })
  @IsEnum(["ACCOMMODATION", "FOOD", "TRANSPORT", "ENTERTAINMENT", "OTHER"], {
    message:
      "Category must be one of: ACCOMMODATION, FOOD, TRANSPORT, ENTERTAINMENT, OTHER",
  })
  category: ExpenseCategory;

  @ApiProperty({
    description: "Date of the expense (YYYY-MM-DD format)",
    example: "2025-07-05",
  })
  @IsDateString(
    {},
    { message: "Date must be a valid date in YYYY-MM-DD format" },
  )
  date: string;

  @ApiProperty({
    description: "ID of the participant who paid for the expense",
    example: 1,
    minimum: 1,
  })
  @IsNumber({}, { message: "Participant ID must be a number" })
  @IsPositive({ message: "Participant ID must be a positive number" })
  @IsInt({ message: "Participant ID must be an integer" })
  participantId: number;
}
