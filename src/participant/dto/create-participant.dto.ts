import { IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  userEmail: string;

  @ApiProperty()
  @IsNumber()
  tripId: number;
}
