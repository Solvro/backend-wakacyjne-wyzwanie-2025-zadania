import { IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateTripParticipantDto {
  @ApiProperty({
    description: "The ID of the participant",
    example: 1,
  })
  @IsNumber()
  participantId: number;

  @ApiProperty({
    description: "The ID of the trip",
    example: 1,
  })
  @IsNumber()
  tripId: number;
}
