import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  destination: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  start_Date: Date;

  @ApiProperty()
  end_Date: Date;

  @ApiProperty()
  created_At: Date;

  @ApiProperty()
  updated_At: Date;
}
