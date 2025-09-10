import { IsEmail } from "class-validator";

export class EmailParameterDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;
}
