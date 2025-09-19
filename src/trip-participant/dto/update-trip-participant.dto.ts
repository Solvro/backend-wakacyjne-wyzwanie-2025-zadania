import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { CreateTripParticipantDto } from "./create-trip-participant.dto";

export class UpdateTripParticipantDto extends PartialType(
  CreateTripParticipantDto,
) {
  @ApiProperty()
  tripId: number;

  @ApiProperty()
  participantId: number;
}
