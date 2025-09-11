import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @ApiPropertyOptional()
  startDate?: Date;

  @ApiPropertyOptional()
  endDate?: Date;

  @ApiPropertyOptional()
  location?: string;
}
