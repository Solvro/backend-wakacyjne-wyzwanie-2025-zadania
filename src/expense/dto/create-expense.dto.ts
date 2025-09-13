import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  tripId: number;
  @ApiProperty()
  payingParticipantId: number;
  @ApiProperty()
  title: string;
  @ApiPropertyOptional()
  description?: string;
  @ApiProperty()
  amount: number;
}
