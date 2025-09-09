import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

export class ResponseParticipantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  tripId: number;

  @ApiPropertyOptional({
    enum: Gender,
    description: "Gender of participant",
    enumName: "Gender",
  })
  gender?: Gender;
}
