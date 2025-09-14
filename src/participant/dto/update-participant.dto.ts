import { Gender } from "@prisma/client";

import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @ApiPropertyOptional()
  first_name?: string;
  @ApiPropertyOptional()
  second_name?: string;
  @ApiPropertyOptional()
  last_name?: string;
  @ApiPropertyOptional()
  email?: string;
  @ApiPropertyOptional({
    enum: Gender,
    description: "Gender",
    enumName: "Gender",
  })
  gender?: Gender;
}
