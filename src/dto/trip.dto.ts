import type { TripCategory } from "@prisma/client";

export class TripDto {
  title: string;
  category?: TripCategory | null;
  destination?: string | null;
  fromDate?: Date | null;
  toDate?: Date | null;
  participantIds?: number[];
}

export class CreateTripDto extends TripDto {
  createdAt: Date = new Date();
}

export class UpdateTripDto extends TripDto {
  expensesIds?: number[];
  updatedAt: Date = new Date();
}

export class TripResponseDto extends CreateTripDto {
  id: number;
  expensesIds?: number[];
}
