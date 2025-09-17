import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, MaxLength } from "class-validator";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  endDate?: Date;

  @MaxLength(100)
  @IsString()
  @ApiPropertyOptional()
  location?: string;
}
