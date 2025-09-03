import { Role } from "@prisma/client";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "jan.kowalski@example.com" })
  @IsEmail({}, { message: "Podaj poprawny adres email" })
  email: string;

  @ApiPropertyOptional({ example: "Lubię podróże" })
  @IsOptional()
  @IsString({ message: "Pole about_me musi być tekstem" })
  @MaxLength(500, { message: "Pole about_me może mieć maksymalnie 500 znaków" })
  about_me?: string;

  @ApiProperty({ example: true })
  @IsBoolean({ message: "Pole is_enabled musi być typu boolean" })
  is_enabled: boolean;

  @ApiProperty({ example: "Jan" })
  @IsOptional()
  @IsString({ message: "Pole name musi być tekstem" })
  @MaxLength(50, { message: "Pole name może mieć maksymalnie 50 znaków" })
  name: string;

  @ApiProperty({ example: "Kowalski" })
  @IsString({ message: "Pole surname musi być tekstem" })
  @MaxLength(50, { message: "Pole surname może mieć maksymalnie 50 znaków" })
  surname: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  @IsEnum(Role, {
    message: "Pole role musi mieć wartość USER, COORDINATOR lub ADMIN",
  })
  role: Role = Role.USER;

  @ApiProperty({ example: "Haslo123!" })
  @IsString({ message: "Pole password musi być tekstem" })
  @MinLength(8, { message: "Hasło musi mieć minimum 8 znaków" })
  @MaxLength(64, { message: "Hasło może mieć maksymalnie 64 znaki" })
  password: string;
}
