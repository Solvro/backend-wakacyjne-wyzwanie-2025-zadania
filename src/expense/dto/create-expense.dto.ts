import { expense_category } from "@prisma/client";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNumber({}, { message: "Pole trip_id musi być liczbą " })
  trip_id: number;

  @ApiProperty()
  @IsNumber({}, { message: "Pole amount musi być liczbą" })
  @IsPositive({ message: "Pole amount musi być większe niż 0" })
  @Max(1_000_000, { message: "Pole amount nie może przekraczać 1 000 000" })
  amount: number;

  @ApiProperty()
  @IsEnum(expense_category, {
    message: "Pole category musi być typu expense_category",
  })
  category: expense_category;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  original_currency?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  original_amount?: number;
}
