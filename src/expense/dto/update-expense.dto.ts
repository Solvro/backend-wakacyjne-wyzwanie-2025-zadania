import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional()
  dailyPrice?: number;

  @ApiPropertyOptional()
  tripId?: number;

  @ApiPropertyOptional()
  discount?: boolean;
}
