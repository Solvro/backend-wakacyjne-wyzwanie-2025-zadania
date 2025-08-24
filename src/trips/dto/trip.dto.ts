import type { TripStatus } from "@prisma/client";

export class CreateTripDto {
  name: string;
  description?: string;
  status?: TripStatus;
  startDate: string;
  endDate: string;
  budget?: number;
}

export class UpdateTripDto {
  name?: string;
  description?: string;
  status?: TripStatus;
  startDate?: string;
  endDate?: string;
  budget?: number;
}

export class UpdateTripStatusDto {
  status: TripStatus;
}
