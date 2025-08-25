import type { expense_category } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  category: expense_category;
}
