import { Category } from "@prisma/client";
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class CreateExpenseDto {
  @IsNotEmpty()
  title: string;

  @IsEnum(Category)
  category: Category;

  @IsDecimal()
  amount: number;

  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  trip_id: number;

  @IsNotEmpty()
  @IsNumber()
  participant_id: number;
}
