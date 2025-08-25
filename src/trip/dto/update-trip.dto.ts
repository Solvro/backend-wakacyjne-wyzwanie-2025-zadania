import { IsDateString } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @ApiProperty()
  @IsDateString()
  updatedAt: string = new Date().toString();
}
