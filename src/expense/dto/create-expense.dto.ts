import { ExpenseCategory } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({ example: "Lunch", description: "Nazwa wydatku" })
  amount: number;
  @ApiProperty({ example: 150.75, description: "Kwota wydatku" })
  tripId: number;
  @ApiProperty({
    example: "FOOD",
    description: "Kategoria wydatku",
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;
}
