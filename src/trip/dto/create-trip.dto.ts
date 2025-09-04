import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, Validate } from "class-validator";
import { CorrectEndDate } from "src/validators/correct-end-date.validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
