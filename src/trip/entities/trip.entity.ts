import { ApiProperty } from "@nestjs/swagger";

export class TripEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;
}
