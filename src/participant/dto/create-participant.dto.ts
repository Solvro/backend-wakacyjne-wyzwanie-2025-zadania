import { Sex } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Validate,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { NoSpaces } from "../../user/validation/no-spaces.validator";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  @Length(3)
  firstName!: string;

  @ApiProperty()
  @IsString()
  @Length(3)
  lastName!: string;

  @ApiProperty()
  @Length(3)
  @IsEmail()
  @Validate(NoSpaces)
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
