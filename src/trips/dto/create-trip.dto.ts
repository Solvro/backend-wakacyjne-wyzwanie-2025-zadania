import { TravelType } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({ example: "Summer Vacation", description: "Name of the trip" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "A relaxing week at the beach",
    description: "Optional description of the trip",
    required: false,
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
  start_date: string;

  @ApiProperty({
    example: "2025-08-15T00:00:00.000Z",
    description: "End date of the trip",
  })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}
