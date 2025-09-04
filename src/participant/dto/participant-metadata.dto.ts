import type { AccountType, Role } from "@prisma/client";

export class ParticipantMetadata {
  id: number;
  email: string;
  role: Role;
  account_type: AccountType;
}
