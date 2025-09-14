import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ExpenseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  what: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  user_email: string;
}
