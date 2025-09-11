import { ParticipantRole } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({ example: "Marek" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Nowak" })
  @IsString()
  lastname: string;

  @ApiPropertyOptional({ example: "mark@example.com" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    enum: ParticipantRole,
    enumName: "ParticipantRole",
  })
  @IsOptional()
  @IsEnum(ParticipantRole)
  role?: ParticipantRole;

  @ApiProperty({
    example: 1,
    description: "Trip ID this participant belongs to",
  })
  @IsInt()
  tripId: number;
}
