import { PartialType } from "@nestjs/mapped-types";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  participantId?: number;
  destination?: string;
  startDate?: string;
  endDate?: string;
}
