import { ExpenseCategory } from "@prisma/client";
import {
  IsCurrency,
  IsEnum,
  IsIBAN,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
  Validate,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { NiceText } from "../../validators/text.validator";

export class CreateExpenseDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  recipientName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIBAN()
  @IsString()
  @MaxLength(50)
  recipientIban?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsCurrency()
  @IsPositive()
  amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsCurrency()
  budgetLeft?: number;

  @Validate(NiceText)
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
