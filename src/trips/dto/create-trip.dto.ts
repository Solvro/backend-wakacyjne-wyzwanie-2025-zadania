import { IsDateString, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({ description: "Destination of the trip", example: "Paris" })
  @IsString()
  destination: string;

  @ApiPropertyOptional({
    description: "Description of the trip",
    example: "Spring vacation",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Start date", example: "2025-04-10" })
  @IsDateString()
  start: string;

  @ApiProperty({ description: "End date", example: "2025-04-15" })
  @IsDateString()
  end: string;
}
