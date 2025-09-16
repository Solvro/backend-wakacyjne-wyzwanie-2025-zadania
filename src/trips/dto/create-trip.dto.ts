import { TravelType } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsFutureDate } from "../../common/validators/is-future-date.validator";

export class CreateTripDto {
  @ApiProperty({ example: "Summer Vacation", description: "Name of the trip" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: "A relaxing week at the beach",
    description: "Optional description of the trip",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "Hawaii", description: "Destination of the trip" })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    enum: TravelType,
    example: TravelType.PLANE,
    description: "Mode of travel",
  })
  @IsEnum(TravelType)
  @IsNotEmpty()
  travel_type: TravelType;

  @ApiProperty({
    example: "2025-08-01T00:00:00.000Z",
    description: "Start date of the trip",
  })
  @IsDateString()
  @IsNotEmpty()
  @IsFutureDate()
  start_date: string;

  @ApiProperty({
    example: "2025-08-15T00:00:00.000Z",
    description: "End date of the trip",
  })
  @IsDateString()
  @IsNotEmpty()
  @IsFutureDate()
  end_date: string;
}
