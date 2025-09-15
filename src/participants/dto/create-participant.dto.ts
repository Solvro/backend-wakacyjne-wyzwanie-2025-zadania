import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

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

  @ApiProperty({
    example: "password123",
    description: "Password of the participant",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  password: string;
}
