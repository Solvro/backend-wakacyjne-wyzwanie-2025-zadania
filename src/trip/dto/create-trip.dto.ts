import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateTripDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date_start: string;

  @IsNotEmpty()
  @IsDateString()
  date_end: string;

  @IsOptional()
  description?: string;
}
