import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  date_start: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  date_end: string;

  @IsOptional()
  @ApiPropertyOptional()
  description?: string;
}
