import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TripResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  destination: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;
}
