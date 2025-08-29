import type { Participant } from "@prisma/client";

export interface ParticipantUpdateResponseDto {
  name: string | null;
}

export function participantToParticipantUpdateDto(
  participant: Participant,
): ParticipantUpdateResponseDto {
  return {
    name: participant.name,
  };
}
