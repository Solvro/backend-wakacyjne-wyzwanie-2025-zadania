import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiProperty()
  value: number;

  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
