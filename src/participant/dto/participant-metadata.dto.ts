import type { Participant, Role } from "@prisma/client";

export interface ParticipantMetadata {
  email: string;
  participant_id: number;
  role: Role;
}

export function participantToMetadata(participant: Participant) {
  return {
    email: participant.email,
    participant_id: participant.participant_id,
    role: participant.role,
  };
}
