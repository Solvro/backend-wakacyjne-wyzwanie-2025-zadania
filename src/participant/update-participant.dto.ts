import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

import { Role } from "./create-participant.dto";

export class UpdateParticipantDto {
  @ApiPropertyOptional({
    description: "Updated participant name",
    example: "Jane Doe",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: "Updated email",
    example: "jane.doe@example.com",
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: "Updated role",
    enum: Role,
    enumName: "Role",
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
