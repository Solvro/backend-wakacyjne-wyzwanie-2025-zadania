import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  amount: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  date?: Date;
}
