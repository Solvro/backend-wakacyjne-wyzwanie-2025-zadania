import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TripResponseDto {
  @ApiProperty({ example: 1, description: "Unique identifier of the trip" })
  trip_id: number;

  @ApiProperty({
    example: "Summer Vacation 2024",
    description: "Name of the trip",
  })
  name: string;

  @ApiProperty({ example: "Kraków", description: "Destination of the trip" })
  destination: string;

  @ApiProperty({ example: "2025-09-01", description: "Start date of the trip" })
  start_date: Date;

  @ApiPropertyOptional({
    example: "2025-09-03",
    description: "End date of the trip",
  })
  end_date?: Date;
}
