import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateParticipantDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsDateString()
  birthday: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
