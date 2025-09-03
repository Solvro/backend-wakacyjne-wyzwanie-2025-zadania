import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsNotPastDate } from "../../common/validators/past-date.validator";

export class CreateExpenseDto {
  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  amount: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNotPastDate({ message: "Expense date cannot be in the past" })
  date?: Date;
}
