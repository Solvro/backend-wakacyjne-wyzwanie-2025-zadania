import { ExpenseCategory } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({ description: "ID płatnika", example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  payerId: number;

  @ApiProperty({ description: "Kwota wydatku", example: 45.5 })
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({
    description: "Kategoria wydatku",
    enum: ExpenseCategory,
    example: ExpenseCategory.FOOD,
  })
  @IsEnum(ExpenseCategory)
  @IsNotEmpty()
  category: ExpenseCategory;

  @ApiProperty({ description: "Waluta", example: "PLN" })
  @IsString()
  @Length(3, 3)
  currency: string;

  @ApiPropertyOptional({
    description: "Data płatności (ISO 8601)",
    example: "2025-07-22T21:37:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  paidAt?: string;
}
