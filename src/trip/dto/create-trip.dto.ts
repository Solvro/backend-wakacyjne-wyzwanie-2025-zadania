import { Type } from "class-transformer";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsFutureDate } from "../../validators/is-future-date.validator";

export class CreateTripDto {
  @ApiProperty({ example: "Summer Vacation 2025" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({ example: "2025-07-01T00:00:00.000Z" })
  @Type(() => Date)
  @IsDate()
  @IsFutureDate({ message: "Start date must be in the future" })
  startDate: Date;

  @ApiPropertyOptional({ example: "2025-07-15T00:00:00.000Z" })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @IsFutureDate({ message: "End date must be in the future" })
  endDate?: Date;

  @ApiPropertyOptional({ example: 5000 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Max(100_000_000)
  budget?: number;
}
