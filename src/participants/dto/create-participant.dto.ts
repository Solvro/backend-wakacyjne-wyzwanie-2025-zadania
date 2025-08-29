import { IsInt } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({ description: "Trip ID", example: 1 })
  @IsInt()
  trip_id: number;

  @ApiProperty({ description: "User ID", example: 1 })
  @IsInt()
  user_id: number;
}
