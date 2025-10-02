import { ExpenseCategory } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({ example: 1, description: "Participant who paid the expense" })
  @IsInt()
  participantId: number;

  @ApiProperty({ example: 132.12 })
  @IsNumber()
  @IsPositive()
  @Max(100_000_000)
  amount: number;

  @ApiPropertyOptional({ example: "EUR" })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ enum: ExpenseCategory, enumName: "ExpenseCategory" })
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @ApiPropertyOptional({ example: "Train tickets" })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  note?: string;

  @ApiPropertyOptional({ example: "2025-08-24T09:00:00.000Z" })
  @IsOptional()
  @IsDateString()
  paidAt?: string | null;
}
