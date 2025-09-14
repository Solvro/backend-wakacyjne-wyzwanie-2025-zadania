import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional()
  trip_id?: number;
  @ApiPropertyOptional()
  desc?: string;
  @ApiPropertyOptional()
  price?: number;
}
