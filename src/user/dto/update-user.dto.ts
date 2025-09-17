import { ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from "class-validator";
import { NiceAge } from "src/validators/nice-age";

export class UserUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  @ApiPropertyOptional()
  login?: string;

  @IsOptional()
  @IsNumber()
  @Validate(NiceAge)
  @ApiPropertyOptional()
  age?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  password?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @ApiPropertyOptional()
  role?: Role[];
}
