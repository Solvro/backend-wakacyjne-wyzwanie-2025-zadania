import { Type } from "class-transformer";
import {
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsNotPastDate } from "../../common/validators/past-date.validator";

export class CreateExpenseDto {
  @ApiProperty()
  @IsDefined()
  @IsInt()
  @IsPositive()
  trip_id: number;

  @ApiProperty()
  @IsDefined()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: ["USD", "EUR", "GBP", "CHF", "JPY", "PLN"] })
  @IsIn(["USD", "EUR", "GBP", "CHF", "JPY", "PLN"])
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotPastDate({ message: "Expense date cannot be in the past" })
  @Type(() => Date)
  date?: Date;
}
