import { ParticipantRole } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({ example: "Marek" })
  @IsString()
  name!: string;

  @ApiProperty({ example: "Nowak" })
  @IsString()
  lastname!: string;

  @ApiProperty({ required: false, example: "mark@example.com" })
  @IsOptional()
  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    enum: ParticipantRole,
    enumName: "ParticipantRole",
    required: false,
  })
  @IsOptional()
  @ApiPropertyOptional()
  @IsEnum(ParticipantRole)
  role?: ParticipantRole;

  @ApiProperty({
    example: 1,
    description: "Trip ID this participant belongs to",
  })
  @IsInt()
  tripId!: number;
}
