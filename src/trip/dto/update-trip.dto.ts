import { PartialType } from "@nestjs/mapped-types";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;

  expenses?: unknown[];
  participants?: unknown[];
}
