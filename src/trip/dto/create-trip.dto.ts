import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { TripStatus } from "../../enums/enums";

export class CreateTripDto {
  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2025",
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: "Start date of the trip",
    example: "2025-07-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({
    description: "End date of the trip",
    example: "2025-07-15T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiPropertyOptional({
    description: "Location of the trip",
    example: "Barcelona, Spain",
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: "Status of the trip",
    enum: TripStatus,
    enumName: "TripStatus",
    example: TripStatus.planned,
  })
  @IsEnum(TripStatus)
  status: TripStatus;
}
