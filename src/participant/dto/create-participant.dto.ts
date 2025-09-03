import { Sex } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  @Min(3)
  @Max(25)
  firstName!: string;

  @ApiProperty()
  @IsString()
  @Min(3)
  lastName!: string;

  @ApiProperty()
  @Min(3)
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  address!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;
}
