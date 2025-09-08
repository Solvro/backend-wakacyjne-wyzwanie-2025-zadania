import type { Sex } from "@prisma/client";

import { PartialType } from "@nestjs/mapped-types";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  id: number;
  name: string;
  surname: string;
  sex?: Sex;
  age: number;
  email: string;
}
