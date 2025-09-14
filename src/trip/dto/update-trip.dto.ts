import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @ApiPropertyOptional()
  participant_id?: number;
  @ApiPropertyOptional()
  destination?: string;
  @ApiPropertyOptional()
  date_start?: Date;
}
