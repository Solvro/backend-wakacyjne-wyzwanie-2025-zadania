import { ApiProperty } from '@nestjs/swagger';
import { Type as TransformType } from 'class-transformer';
import { Type as ExpenseType } from '@prisma/client'; // enum: FOOD | TRANSPORT | ACCOMODATION | PARKING | OTHER

export class CreateExpenseDto {
  @ApiProperty({ description: 'Description', example: 'Lunch near Colosseum' })
  description: string;

  @ApiProperty({ description: 'Cost', example: 35.5 })
  @TransformType(() => Number)
  cost: number;

  @ApiProperty({ description: 'Expense type', enum: ExpenseType, example: ExpenseType.FOOD })
  type: ExpenseType;

  @ApiProperty({ description: 'Trip ID', example: 1 })
  tripId: number;

  @ApiProperty({ description: 'Payer (Participant) ID', example: 2 })
  payerId: number;
}
