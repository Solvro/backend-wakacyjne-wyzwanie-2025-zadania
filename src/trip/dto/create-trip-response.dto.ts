import { IsDateString, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { CreateTripDto } from "./create-trip.dto";

export class CreateTripResponseDto extends CreateTripDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDateString()
  updatedAt: string = new Date().toString();

  @ApiProperty()
  @IsDateString()
  createdAt: string = new Date().toString();
}
