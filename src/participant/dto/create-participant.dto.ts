import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  surname: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  age: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_num?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}
