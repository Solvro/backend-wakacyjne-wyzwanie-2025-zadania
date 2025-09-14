import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({
    description: "Name of the participant",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Email of the participant (optional)",
    example: "john.doe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Role of the participant",
    enum: Role,
    enumName: "Role",
    example: Role.PARTICIPANT,
  })
  @IsEnum(Role)
  role: Role;
}
