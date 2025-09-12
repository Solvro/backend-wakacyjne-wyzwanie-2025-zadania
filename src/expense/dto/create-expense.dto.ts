import { ExpenseCategory } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({ example: 1, description: "Participant who paid the expense" })
  @IsInt()
  participantId: number;

  @ApiProperty({ example: 132.12 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: ExpenseCategory, enumName: "ExpenseCategory" })
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @ApiPropertyOptional({ example: "Train tickets" })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({ example: "2025-08-24T09:00:00.000Z" })
  @IsOptional()
  @IsDateString()
  paidAt?: string | null;
}
