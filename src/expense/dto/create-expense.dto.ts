import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  amount: number;
  @ApiPropertyOptional()
  description?: string;
  @ApiPropertyOptional()
  createdAt?: string;
  @ApiProperty()
  tripId: number;
}
