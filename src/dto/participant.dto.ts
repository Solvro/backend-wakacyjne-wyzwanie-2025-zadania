import type { ParticipantRole, ParticipantSex } from "@prisma/client";

class ParticipantDto {
  name: string;
  surname: string;
  role?: ParticipantRole | null;
  email?: string | null;
  phone?: string | null;
  isAdult: boolean;
  sex?: ParticipantSex | null;
  tripsIds?: number[];
}

export class CreateParticipantDto extends ParticipantDto {
  createdAt: Date = new Date();
}

export class UpdateParticipantDto extends ParticipantDto {
  expensesIds?: number[];
  updatedAt: Date = new Date();
}

export class ParticipantResponseDto extends CreateParticipantDto {
  id: number;
  expensesIds?: number[];
}
