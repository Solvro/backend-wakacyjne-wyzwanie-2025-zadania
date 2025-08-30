import type { ExpenseCategory } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({
    description: "A short description of the expense",
    example: "Obiad w restauracji",
  })
  description: string;

  @ApiProperty({ description: "The cost of the expense", example: 125.5 })
  amount: number;

  @ApiProperty({
    description: "The category of the expense",
    example: "ACCOMODATION",
  })
  category: ExpenseCategory;

  @ApiPropertyOptional({
    description: "The date the expense occurred (optional, defaults to now)",
    example: "2025-09-08T18:30:00Z",
  })
  date?: string;

  @ApiProperty({
    description: "The ID of the trip this expense belongs to",
    example: 2,
  })
  tripId: number;

  @ApiProperty({
    description: "The ID of the participant who paid for the expense",
    example: 3,
  })
  paidByParticipantId: number;
}
