import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({
    example: "Jan Kowalski",
    description: "Name of the participant",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "jan.kowalski@example.com",
    description: "Email of the participant",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
