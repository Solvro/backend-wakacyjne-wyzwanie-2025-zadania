import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2024",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Destination of the trip",
    example: "Kraków",
  })
  @IsString()
  destination: string;

  @ApiProperty({
    description: "Start date of the trip (YYYY-MM-DD)",
    example: "2025-09-01",
  })
  @IsDateString()
  start_date: string;

  @ApiPropertyOptional({
    description: "End date of the trip (YYYY-MM-DD)",
    example: "2025-09-03",
  })
  @IsOptional()
  @IsDateString()
  end_date?: string | null;

  @ApiPropertyOptional({
    description: "Planned budget for the trip",
    example: 1200,
  })
  @IsOptional()
  @IsNumber()
  budget?: number | null;
}
