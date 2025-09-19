import { IsIn } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsNotPastDate } from "../../common/validators/past-date.validator";

export class CreateExpenseDto {
  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: ["USD", "EUR", "GBP", "CHF", "JPY", "PLN"] })
  @IsIn(["USD", "EUR", "GBP", "CHF", "JPY", "PLN"])
  currency: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNotPastDate({ message: "Expense date cannot be in the past" })
  date?: Date;
}
