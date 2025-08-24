export class CreateParticipantDto {
  name: string;
  email: string;
  phone?: string;
  isOrganizer?: boolean;
}
