import type { Sex } from "@prisma/client";

import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiPropertyOptional()
  sex?: Sex;
  @ApiProperty()
  age: number;
  @ApiProperty()
  email: string;
}
