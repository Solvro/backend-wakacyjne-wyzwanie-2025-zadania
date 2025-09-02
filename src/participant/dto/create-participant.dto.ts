import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  trip_id: number;
}
