import type { TripStatus } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({
    description: "Name of the trip",
    example: "Summer Vacation 2025",
  })
  name: string;

  @ApiPropertyOptional({
    description: "Description of the trip",
    example: "A wonderful summer vacation to the mountains",
  })
  description?: string;

  @ApiPropertyOptional({
    description: "Status of the trip",
    enum: ["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"],
    example: "PLANNED",
  })
  status?: TripStatus;

  @ApiProperty({
    description: "Start date of the trip",
    example: "2025-07-01",
  })
  startDate: string;

  @ApiProperty({
    description: "End date of the trip",
    example: "2025-07-15",
  })
  endDate: string;

  @ApiPropertyOptional({
    description: "Budget for the trip in cents",
    example: 150_000,
  })
  budget?: number;
}

export class UpdateTripDto {
  @ApiPropertyOptional({
    description: "Name of the trip",
    example: "Summer Vacation 2025",
  })
  name?: string;

  @ApiPropertyOptional({
    description: "Description of the trip",
    example: "A wonderful summer vacation to the mountains",
  })
  description?: string;

  @ApiPropertyOptional({
    description: "Status of the trip",
    enum: ["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"],
    example: "PLANNED",
  })
  status?: TripStatus;

  @ApiPropertyOptional({
    description: "Start date of the trip",
    example: "2025-07-01",
  })
  startDate?: string;

  @ApiPropertyOptional({
    description: "End date of the trip",
    example: "2025-07-15",
  })
  endDate?: string;

  @ApiPropertyOptional({
    description: "Budget for the trip in cents",
    example: 150_000,
  })
  budget?: number;
}

export class UpdateTripStatusDto {
  @ApiProperty({
    description: "Status of the trip",
    enum: ["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"],
    example: "ACTIVE",
  })
  status: TripStatus;
}
