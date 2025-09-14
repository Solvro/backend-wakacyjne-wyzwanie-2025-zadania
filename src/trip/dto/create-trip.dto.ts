import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  participant_id: number;
  @ApiProperty()
  destination: string;
  @ApiProperty()
  date_start: Date;
}
