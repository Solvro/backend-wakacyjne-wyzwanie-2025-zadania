import { PartialType } from "@nestjs/mapped-types";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  id: number;
  name: string;
  start: Date;
  end: Date;
}
