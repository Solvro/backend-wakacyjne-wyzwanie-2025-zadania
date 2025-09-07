import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ExpenseResponseDto {
  @ApiProperty({
    description: "Unique identifier of the expense",
    example: 1,
  })
  expense_id: number;

  @ApiProperty({
    description: "Type of the expense",
    example: "FOOD",
  })
  expense_type: string;

  @ApiProperty({
    description: "Date when the expense occurred",
    example: "2025-09-01T12:00:00.000Z",
  })
  expense_date: Date;

  @ApiProperty({
    description: "Cost of the expense",
    example: 85.5,
  })
  cost: number;

  @ApiPropertyOptional({
    description: "Optional description of the expense",
    example: "Lunch in Kraków",
    nullable: true,
  })
  description?: string;
}
