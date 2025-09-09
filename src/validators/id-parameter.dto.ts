import { Transform } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class IdParameterDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? Number.parseInt(value, 10) : value,
  )
  @IsInt({ message: "ID must be a valid integer" })
  @Min(1, { message: "ID must be greater than 0" })
  id: number;
}
