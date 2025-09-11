import { ApiProperty } from "@nestjs/swagger";

export class ResponseTripDto {
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  location: string;
}
