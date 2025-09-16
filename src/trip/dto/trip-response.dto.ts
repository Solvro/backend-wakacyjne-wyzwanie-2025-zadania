import { IsBoolean, IsDateString, IsInt } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { CreateTripDto } from "./create-trip.dto";

export class TripResponseDto extends CreateTripDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsDateString()
  updatedAt: string = new Date().toString();

  @ApiProperty()
  @IsDateString()
  createdAt: string = new Date().toString();

  @ApiProperty()
  @IsBoolean()
  isArchived: boolean;
}
