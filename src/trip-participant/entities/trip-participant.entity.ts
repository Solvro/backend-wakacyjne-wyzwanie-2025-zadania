import { ApiProperty } from "@nestjs/swagger";

export class TripParticipantEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tripId: number;

  @ApiProperty()
  participantId: number;
}
