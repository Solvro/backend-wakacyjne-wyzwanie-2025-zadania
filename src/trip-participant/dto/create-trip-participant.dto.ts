import { ApiProperty } from "@nestjs/swagger";

export class CreateTripParticipantDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tripId: number;

  @ApiProperty()
  participantId: number;
}
