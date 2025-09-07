import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TripResponseDto {
  @ApiProperty({
    description: "Unique identifier of the trip",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Name of the trip",
    example: "Italy 2025",
  })
  name: string;

  @ApiPropertyOptional({
    description: "Destination (city / country)",
    example: "Rome",
    nullable: true,
  })
  destination?: string;

  @ApiPropertyOptional({
    description: "Planned budget for the trip (currency units)",
    example: 5000,
    nullable: true,
  })
  budget?: number;

  @ApiProperty({
    description: "Trip start date (ISO 8601)",
    example: "2025-09-10",
    format: "date",
  })
  startDate: string; // w API zazwyczaj zwracamy jako string

  @ApiPropertyOptional({
    description: "Trip end date (ISO 8601)",
    example: "2025-09-20",
    format: "date",
    nullable: true,
  })
  endDate?: string;

  @ApiProperty({
    description: "Creation timestamp",
    example: "2024-01-15T10:30:00.000Z",
    format: "date-time",
  })
  createdAt: string;
}
