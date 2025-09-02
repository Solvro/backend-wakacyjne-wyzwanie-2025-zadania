import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsString, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({
    description: "First name of the participant",
    example: "Jan",
  })
  @IsString()
  @MinLength(2)
  first_name: string;

  @ApiProperty({
    description: "Last name of the participant",
    example: "Kowalski",
  })
  @IsString()
  @MinLength(2)
  last_name: string;

  @ApiProperty({
    description: "Role of the participant in the trip",
    enum: Role,
    example: Role.ORGANIZER,
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: "Email address of the participant",
    example: "jan.kowalski@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "ID of the trip this participant belongs to",
    example: 1,
  })
  @IsInt()
  trip_id: number;
}
