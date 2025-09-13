import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional()
  tripId?: number;
  @ApiPropertyOptional()
  payingParticipantId?: number;
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  description?: string;
  @ApiPropertyOptional()
  amount?: number;
}
