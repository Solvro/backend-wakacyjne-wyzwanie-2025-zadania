import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  participantId!: number;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  startDate!: string;

  @ApiProperty()
  endDate!: string;
}
