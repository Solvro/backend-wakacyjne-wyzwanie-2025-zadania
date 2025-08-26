import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  trip_participant_id: number;
}
