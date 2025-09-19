import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiProperty()
  id: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  tripParticipantId: number;
}
