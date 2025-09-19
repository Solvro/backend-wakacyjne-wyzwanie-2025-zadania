import { Category, CurrencyName } from "@prisma/client";

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
  currency: CurrencyName;

  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  participant_id: number;
}
