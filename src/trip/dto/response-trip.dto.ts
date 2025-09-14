import { ApiProperty } from "@nestjs/swagger";

export class ResponseTripDto {
  @ApiProperty()
  participant_id: number;
  @ApiProperty()
  destination: string;
  @ApiProperty()
  date_start: Date;
}
