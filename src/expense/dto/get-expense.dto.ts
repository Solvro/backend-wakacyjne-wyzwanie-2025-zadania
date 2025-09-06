import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetExpenseDto {
  @ApiProperty()
  id: number;
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
  @ApiProperty()
  status: string;
  @ApiPropertyOptional()
  paymentDate?: Date;
}
