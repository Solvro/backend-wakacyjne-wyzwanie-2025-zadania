import { ApiProperty } from "@nestjs/swagger";

export class CreateTripResponseDto {
  @ApiProperty()
  trip_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  date_start: string;

  @ApiProperty()
  date_end: string;

  @ApiProperty()
  description: string;
}
