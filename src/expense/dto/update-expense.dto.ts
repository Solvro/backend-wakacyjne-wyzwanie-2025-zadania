import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional()
  trip_id?: number;

  @ApiPropertyOptional()
  amount?: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  date?: Date;
}
