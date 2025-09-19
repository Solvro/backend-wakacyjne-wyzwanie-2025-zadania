import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  tripParticipantId: number;
}
