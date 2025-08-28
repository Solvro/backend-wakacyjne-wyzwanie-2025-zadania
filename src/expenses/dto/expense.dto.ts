import type { ExpenseCategory } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ExpenseDto {
  @ApiProperty({
    description: "Title of the expense",
    example: "Hotel accommodation",
  })
  title: string;

  @ApiPropertyOptional({
    description: "Description of the expense",
    example: "3 nights at Grand Hotel",
  })
  description?: string;

  @ApiProperty({
    description: "Amount of the expense in cents",
    example: 25_000,
  })
  amount: number;

  @ApiProperty({
    description: "Category of the expense",
    enum: ["ACCOMMODATION", "FOOD", "TRANSPORT", "ENTERTAINMENT", "OTHER"],
    example: "ACCOMMODATION",
  })
  category: ExpenseCategory;

  @ApiProperty({
    description: "Date of the expense",
    example: "2025-07-05",
  })
  date: string;

  @ApiProperty({
    description: "ID of the participant who paid for the expense",
    example: 1,
  })
  participantId: number;
}
