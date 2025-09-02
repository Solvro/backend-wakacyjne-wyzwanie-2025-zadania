import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantResponseDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  trip_id?: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  surname?: string;

  @ApiProperty()
  email: string;
}
