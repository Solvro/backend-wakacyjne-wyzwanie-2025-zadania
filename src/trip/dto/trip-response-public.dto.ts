import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TripResponsePublicDto {
  @ApiProperty({
    description: "The unique identifier of the trip",
    example: 1,
  })
  @IsNumber()
  trip_id: number;

  @ApiProperty({
    description: "The destination of the trip",
    example: "Paris",
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiPropertyOptional({
    description: "The description of the trip",
    example: "A week-long trip to Paris",
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "The start date of the trip",
    example: "2023-05-01",
  })
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    description: "The end date of the trip",
    example: "2023-05-10",
  })
  @IsString()
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({
    description: "Date when the trip was created",
    example: "2024-01-15T10:30:00.000Z",
  })
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Date when the trip was last updated",
    example: "2024-01-15T10:30:00.000Z",
  })
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
