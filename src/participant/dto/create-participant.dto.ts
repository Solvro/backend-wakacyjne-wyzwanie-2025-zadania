import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

export class CreateParticipantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  tripId: number;

  @ApiPropertyOptional()
  gender?: Gender;
}
