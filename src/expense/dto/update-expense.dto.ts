import { Type } from "class-transformer";
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  trip_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  amount?: number;

  @ApiPropertyOptional({ enum: ["USD", "EUR", "GBP", "CHF", "JPY", "PLN"] })
  @IsIn(["USD", "EUR", "GBP", "CHF", "JPY", "PLN"])
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  date?: Date;
}
