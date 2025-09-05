export class CreateExpenseDto {
  tripId: number;
  payingParticipantId: number;
  title: string;
  description?: string;
  amount: number;
}
