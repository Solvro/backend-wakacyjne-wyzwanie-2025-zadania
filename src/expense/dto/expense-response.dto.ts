import { ApiProperty } from '@nestjs/swagger';
import { Type as ExpenseType } from '@prisma/client';

export class ExpenseResponseDto {
  @ApiProperty({ description: 'Expense ID', example: 10 })
  id: number;

  @ApiProperty({ description: 'Description', example: 'Lunch near Colosseum' })
  description: string;

  @ApiProperty({ description: 'Cost', example: 35.5 })
  cost: number;

  @ApiProperty({ description: 'Type', enum: ExpenseType, example: ExpenseType.FOOD })
  type: ExpenseType;

  @ApiProperty({ description: 'Trip ID', example: 1 })
  tripId: number;

  @ApiProperty({ description: 'Payer (Participant) ID', example: 2 })
  payerId: number;
}
