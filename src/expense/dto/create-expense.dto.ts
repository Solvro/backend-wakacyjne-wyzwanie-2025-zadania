import { Category } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Validate,
} from "class-validator";
import { DateValidator } from "src/validators/date.validator";

export class CreateExpenseDto {
  @IsNotEmpty()
  title: string;

  @IsEnum(Category)
  category: Category;

  @IsNumber()
  amount: number;

  @IsDateString()
  @Validate(DateValidator)
  date: string;

  @IsNotEmpty()
  @IsNumber()
  trip_id: number;
}
