import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { TripStatus } from "../../enums/enums";

export class TripResponseDto {
  @ApiProperty({
    description: "Unique identifier of the trip",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2025",
  })
  name: string;

  @ApiPropertyOptional({
    description: "Start date of the trip",
    example: "2025-07-01T00:00:00.000Z",
  })
  start_date?: Date;

  @ApiPropertyOptional({
    description: "End date of the trip",
    example: "2025-07-15T00:00:00.000Z",
  })
  end_date?: Date;

  @ApiPropertyOptional({
    description: "Location of the trip",
    example: "Barcelona, Spain",
  })
  location?: string;

  @ApiProperty({
    description: "Status of the trip",
    enum: TripStatus,
    enumName: "TripStatus",
    example: TripStatus.planned,
  })
  status: TripStatus;
}
