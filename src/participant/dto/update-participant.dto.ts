import { IsBoolean, IsDateString } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @ApiProperty()
  @IsDateString()
  updatedAt: string = new Date().toString();

  @ApiProperty()
  @IsBoolean()
  isArchived: boolean;
}
