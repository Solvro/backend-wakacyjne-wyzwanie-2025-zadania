import { ExpenseCategory } from "@prisma/client";
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recipientName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recipientIban?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  quantity?: number;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  currency: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  budgetLeft?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  participantId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  tripId?: number;
}
