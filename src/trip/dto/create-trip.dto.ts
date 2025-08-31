import { IsDateString, IsOptional, IsString, MinLength } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({
    description: "The destination of the trip",
    example: "Paris",
    minLength: 1,
  })
  @IsString()
  @MinLength(1, { message: "Trip destination must not be empty" })
  destination: string;

  @ApiPropertyOptional({
    description: "The description of the trip",
    example: "A week-long trip to Paris",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "The start date of the trip",
    example: "2023-06-01",
  })
  @IsDateString(
    {},
    { message: "Start date must be a valid ISO 8601 date string (YYYY-MM-DD)" },
  )
  startDate: string;

  @ApiPropertyOptional({
    description: "The end date of the trip",
    example: "2023-06-07",
  })
  @IsDateString(
    {},
    { message: "End date must be a valid ISO 8601 date string (YYYY-MM-DD)" },
  )
  @IsOptional()
  endDate?: string;
}
