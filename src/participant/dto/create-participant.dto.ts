import { IsEmail, IsString, MaxLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  @MaxLength(80)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
