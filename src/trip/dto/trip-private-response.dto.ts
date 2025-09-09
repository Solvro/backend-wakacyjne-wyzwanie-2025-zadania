import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { ParticipantResponseDto } from "../../participant/dto/participant-response.dto";

export class TripPrivateResponseDto {
  @ApiProperty({ example: 1 })
  trip_id: number;

  @ApiProperty({ example: "Summer Vacation 2024" })
  name: string;

  @ApiProperty({ example: "Kraków" })
  destination: string;

  @ApiProperty({ example: "2025-09-01" })
  start_date: Date;

  @ApiPropertyOptional({ example: "2025-09-03" })
  end_date?: Date;

  @ApiPropertyOptional({ example: 1200 })
  budget?: number;

  @ApiProperty({ type: [ParticipantResponseDto] })
  participants: ParticipantResponseDto[];
}
