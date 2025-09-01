export class CreateTripDto {
  name: string;
  destination?: string;
  budget?: number;          // lub string; i tak zamieniamy na Decimal
  startDate: string | Date; // wymagane
  endDate?: string | Date;
}