import { IsIn } from "class-validator";

import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional()
  trip_id?: number;

  @ApiPropertyOptional()
  amount?: number;

  @ApiPropertyOptional({ enum: ["USD", "EUR", "GBP", "CHF", "JPY", "PLN"] })
  @IsIn(["USD", "EUR", "GBP", "CHF", "JPY", "PLN"])
  currency?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  date?: Date;
}
