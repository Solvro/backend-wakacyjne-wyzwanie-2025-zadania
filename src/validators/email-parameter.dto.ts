import { Transform } from "class-transformer";
import { IsEmail } from "class-validator";

export class EmailParameterDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.toLowerCase().trim() : value,
  )
  email: string;
}
