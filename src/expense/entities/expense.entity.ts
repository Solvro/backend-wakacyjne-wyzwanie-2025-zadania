import { ApiProperty } from "@nestjs/swagger";

export class ExpenseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  tripParticipantId: number;
}
