import { trip_type } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  destination: string;

  @ApiProperty()
  type: trip_type;

  @ApiProperty()
  start_date: Date;

  @ApiPropertyOptional()
  end_date?: Date;
}
