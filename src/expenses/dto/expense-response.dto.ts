import { ExpenseCategory } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class ExpenseResponseDto {
  @ApiProperty({ example: 123 })
  id: number;

  @ApiProperty({ example: 1, description: "ID płatnika" })
  payerId: number;

  @ApiProperty({ example: 45.5 })
  amount: number;

  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.FOOD })
  category: ExpenseCategory;

  @ApiProperty({ example: "PLN" })
  currency: string;

  @ApiProperty({ example: "2025-07-22T21:37:00.000Z", nullable: true })
  paidAt: string | null;

  @ApiProperty({ example: "2025-07-22T21:38:10.000Z" })
  createdAt: string;

  @ApiProperty({ example: "2025-07-22T21:38:10.000Z" })
  updatedAt: string;
}
