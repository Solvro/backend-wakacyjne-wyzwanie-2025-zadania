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

export class CreateExpenseDto {
  @IsInt()
  trip_id: number;

  @IsEnum(ExpenseType)
  expense_type: ExpenseType;

  @IsDateString()
  expense_date: string;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsOptional()
  @IsString()
  description?: string;
}
