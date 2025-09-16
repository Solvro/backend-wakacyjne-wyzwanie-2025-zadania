import { Allow, IsOptional, IsString, Validate } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DateValidator } from "../../validators/date.validator";

export class CreateTripDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ type: String, format: "date-time" })
  @Allow()
  @Validate(DateValidator)
  startDate: string;

  @ApiProperty({ type: String, format: "date-time" })
  @Allow()
  @Validate(DateValidator)
  endDate: string;
}
