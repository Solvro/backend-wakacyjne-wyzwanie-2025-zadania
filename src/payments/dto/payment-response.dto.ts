export class PaymentResponseDto {
  id: number;
  tripId: number;
  participantId?: number | null;
  currency: string;
  amountForeign: string;
  rate: string;
  amountPln: string;
  createdAt: string;
}
