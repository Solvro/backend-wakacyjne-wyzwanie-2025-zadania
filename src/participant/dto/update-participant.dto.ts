import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  surname?: string;

  @ApiProperty()
  age?: number;

  @ApiProperty()
  tripId?: number;

  @ApiPropertyOptional({
    enum: Gender,
    description: "Gender of participant",
    enumName: "Gender",
  })
  gender?: Gender;
}
