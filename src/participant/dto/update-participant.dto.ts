import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @ApiPropertyOptional()
  trip_id?: number;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  surname?: string;

  @ApiPropertyOptional()
  email?: string;
}
