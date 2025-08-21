import { Category } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseResponseDto {
  @ApiProperty()
  expense_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  participant_id: number;
}
