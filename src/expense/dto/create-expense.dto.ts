import { Category, CurrencyName } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Validate,
} from "class-validator";
import { DateValidator } from "src/validators/date.validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsEnum(Category)
  @ApiProperty()
  category: Category;

  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsEnum(CurrencyName)
  @ApiProperty()
  currency: CurrencyName;

  @IsDateString()
  @ApiProperty()
  @Validate(DateValidator)
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  trip_id: number;
}
