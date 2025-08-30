import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class TripDetails {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  budget: number;
}

export class ParticipantResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: [TripDetails] })
  trips: [TripDetails];
}
