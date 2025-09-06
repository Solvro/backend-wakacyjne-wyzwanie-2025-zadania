import { ApiProperty } from "@nestjs/swagger";

export class ParticipantEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
