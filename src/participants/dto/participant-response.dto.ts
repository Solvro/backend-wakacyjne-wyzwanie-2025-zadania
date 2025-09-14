import { ApiProperty } from "@nestjs/swagger";

export class ParticipantResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  user_email: string;
}
