import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  tripId!: number;

  @ApiProperty()
  expenseAmount!: number;

  @ApiPropertyOptional()
  expenseDescription?: string;
}
