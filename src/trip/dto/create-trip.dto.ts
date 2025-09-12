import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { IsFutureDate } from "src/validators/is-future-date.validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({
    description: "Name of the trip",
    example: "Italy 2025",
  })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({
    description: "Destination (city / country)",
    example: "Rome",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  destination?: string;

  @ApiPropertyOptional({
    description: "Planned budget for the trip (currency units)",
    example: 5000,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  budget?: number;

  @ApiProperty({
    description: "Trip start date (ISO 8601)",
    example: "2025-09-10",
    format: "date",
  })
  @IsDateString()
  @IsFutureDate({ message: "Start date must be in the future" })
  startDate: string | Date; // w serwisie: new Date(dto.startDate)

  @ApiPropertyOptional({
    description: "Trip end date (ISO 8601)",
    example: "2025-09-20",
    format: "date",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  @IsFutureDate({ message: "End date must be in the future" })
  endDate?: string | Date;

  @IsOptional()
  participantIds?: number[];
}
