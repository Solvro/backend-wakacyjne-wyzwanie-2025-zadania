import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, Validate } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { CorrectEndDate } from "../../validators/correct-end-date.validator";

export class CreateTripDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  begin_date: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @Validate(CorrectEndDate)
  end_date: Date;
}
