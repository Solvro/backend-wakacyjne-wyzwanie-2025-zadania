import { Type } from "class-transformer";
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import { DateValidator } from "src/validators/date.validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
  @Type(() => Date)
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Validate(DateValidator)
  createdAt?: Date;
  @ApiProperty()
  @IsNumber()
  tripId: number;
}
