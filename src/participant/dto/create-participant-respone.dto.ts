import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  created_At: Date;

  @ApiProperty()
  updated_At: Date;
}
