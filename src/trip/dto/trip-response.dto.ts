import { ExpenseResponseDto } from "src/expense/dto/expense-response.dto";
import { ParticipantResponseDto } from "src/participant/dto/participant-response.dto";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TripResponseDto {
  @ApiProperty({
    description: "The unique identifier of the trip",
    example: 1,
  })
  trip_id: number;

  @ApiProperty({
    description: "The destination of the trip",
    example: "Paris",
  })
  destination: string;

  @ApiPropertyOptional({
    description: "The description of the trip",
    example: "A week-long trip to Paris",
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: "The start date of the trip",
    example: "2023-05-01",
  })
  start_date: string;

  @ApiProperty({
    description: "The end date of the trip",
    example: "2023-05-10",
  })
  end_date: string;

  @ApiProperty({
    description: "Date when the trip was created",
    example: "2024-01-15T10:30:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date when the trip was last updated",
    example: "2024-01-15T10:30:00.000Z",
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: "The list of expenses for the trip",
    isArray: true,
    type: [ExpenseResponseDto],
  })
  expenses?: ExpenseResponseDto[];

  @ApiPropertyOptional({
    description: "The list of participants in the trip",
    isArray: true,
    type: [ParticipantResponseDto],
  })
  participants?: ParticipantResponseDto[];
}
