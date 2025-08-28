import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum Role {
  GUIDE = "GUIDE",
  PARTICIPANT = "PARTICIPANT",
}

export class CreateParticipantDto {
  @ApiProperty({
    description: "Name of the participant",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: "Email of the participant (optional)",
    example: "john.doe@example.com",
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: "Role of the participant",
    enum: Role,
    enumName: "Role",
    example: Role.PARTICIPANT,
  })
  @IsEnum(Role)
  role: Role;
}
