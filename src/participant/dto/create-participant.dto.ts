import { ParticipantRole, ParticipantSex } from "@prisma/client";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsEnum(ParticipantRole)
  role: ParticipantRole;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nick?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  iban?: string;

  @ApiProperty()
  @IsBoolean()
  isAdult: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string = new Date().toString();

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  placeOfBirth?: string;

  @ApiProperty()
  @IsEnum(ParticipantSex)
  sex: ParticipantSex;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    isArray: true,
  })
  @IsOptional()
  tripsIds?: number[];

  @ApiPropertyOptional({
    isArray: true,
  })
  @IsOptional()
  expensesIds?: number[];
}
