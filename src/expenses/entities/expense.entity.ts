import { ExpenseCategory } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class ExpenseEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  payerId: number;

  @ApiProperty({ type: "number", example: 45.5 })
  amount: number;

  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.FOOD })
  category: ExpenseCategory;

  @ApiProperty({ example: "PLN" })
  currency: string;

  @ApiProperty({
    example: "2025-07-22T21:37:00.000Z",
    nullable: true,
  })
  paidAt: Date | null;
}
