import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;
}
