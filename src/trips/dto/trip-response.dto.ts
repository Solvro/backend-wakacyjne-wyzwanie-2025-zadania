export class TripResponseDto {
  id!: number;
  name!: string;
  description?: string | null;
  status!: "PLANNED" | "ONGOING" | "COMPLETED" | "CANCELLED";
  startDate!: string;
  endDate?: string | null;
  createdAt!: string;
  budget?: string | null;
}
