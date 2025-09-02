import { ExpenseType } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({
    description: "ID of the trip this expense belongs to",
    example: 1,
  })
  @IsInt()
  trip_id: number;

  @ApiProperty({
    description: "Type of the expense",
    enum: ExpenseType,
    example: ExpenseType.FOOD,
  })
  @IsEnum(ExpenseType)
  expense_type: ExpenseType;

  @ApiProperty({
    description: "Date when the expense occurred (YYYY-MM-DD)",
    example: "2025-09-01",
  })
  @IsDateString()
  expense_date: string;

  @ApiProperty({
    description: "Cost of the expense",
    example: 85.5,
  })
  @IsNumber()
  @Min(0)
  cost: number;

  @ApiPropertyOptional({
    description: "Description of the expense",
    example: "Dinner at restaurant",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
