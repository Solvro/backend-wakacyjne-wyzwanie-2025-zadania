import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  destination: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
