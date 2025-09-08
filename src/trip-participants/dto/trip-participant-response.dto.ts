import { IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class TripParticipantResponseDto {
  @ApiProperty()
  @IsNumber()
  participantId: number;

  @ApiProperty()
  @IsNumber()
  tripId: number;
}
