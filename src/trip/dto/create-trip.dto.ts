import { TripCategory } from "@prisma/client";
import {
  IsCurrency,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Validate,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { NiceDate } from "../../validators/date.validator";
import { NiceText } from "../../validators/text.validator";

export class CreateTripDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsEnum(TripCategory)
  category: TripCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  destination?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsCurrency()
  @IsPositive()
  budget?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: string = new Date().toString();

  @NiceDate("startDate")
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: string = new Date().toString();

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accommodation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  travelTime?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  travelDistance?: number;

  @Validate(NiceText)
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    isArray: true,
  })
  @IsOptional()
  participantIds?: number[];

  @ApiPropertyOptional({
    isArray: true,
  })
  @IsOptional()
  expensesIds?: number[];
}
