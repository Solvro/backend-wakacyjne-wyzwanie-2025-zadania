import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  location: string;
}
