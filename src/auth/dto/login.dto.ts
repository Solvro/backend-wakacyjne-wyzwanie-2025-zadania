import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsString()
  password: string;
}
