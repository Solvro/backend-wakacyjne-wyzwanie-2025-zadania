import { Type } from "class-transformer";
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DateValidator } from "../../validators/date.validator";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
  @Type(() => Date)
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Validate(DateValidator)
  createdAt?: Date;
  @ApiProperty()
  @IsNumber()
  tripId: number;
}
