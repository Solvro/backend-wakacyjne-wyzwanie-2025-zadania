import { IsInt } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({ description: "Trip ID", example: 1 })
  @IsInt()
  trip_id: number;

  @ApiProperty({ description: "Person ID", example: 1 })
  @IsInt()
  person_id: number;
}
