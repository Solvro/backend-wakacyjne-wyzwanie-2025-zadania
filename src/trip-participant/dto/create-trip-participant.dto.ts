import { ApiProperty } from "@nestjs/swagger";

export class CreateTripParticipantDto {
  @ApiProperty()
  tripId: number;

  @ApiProperty()
  participantId: number;
}
