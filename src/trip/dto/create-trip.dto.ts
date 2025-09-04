import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  participantId!: number;

  @ApiProperty()
  destination!: string;

  @ApiProperty({ type: String, format: "date-time" })
  startDate!: Date;

  @ApiProperty({ type: String, format: "date-time" })
  endDate!: Date;
}
