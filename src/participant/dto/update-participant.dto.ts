import type { Sex } from "@prisma/client";

import { PartialType } from "@nestjs/mapped-types";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  sex?: Sex;
}
