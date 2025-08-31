import { ApiProperty } from "@nestjs/swagger";

export class TripParticipantResponseDto {
  @ApiProperty()
  participantId: number;

  @ApiProperty()
  tripId: number;
}
