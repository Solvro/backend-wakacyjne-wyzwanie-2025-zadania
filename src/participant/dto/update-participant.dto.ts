import type { AccountType } from "@prisma/client";

import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  surname?: string;

  @ApiPropertyOptional()
  account_type?: AccountType;
}
