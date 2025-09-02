import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsString, MinLength } from "class-validator";

export class CreateParticipantDto {
  @IsString()
  @MinLength(2)
  first_name: string;

  @IsString()
  @MinLength(2)
  last_name: string;

  @IsEnum(Role)
  role: Role;

  @IsEmail()
  email: string;

  @IsInt()
  trip_id: number;
}
