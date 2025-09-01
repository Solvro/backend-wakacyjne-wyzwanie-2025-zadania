import type { Sex } from "@prisma/client";

export class CreateParticipantResponseDto {
  participantId!: number;
  firstName!: string;
  lastName!: string;
  address!: string;
  phoneNumber?: string;
  email!: string;
  sex?: Sex;
}
