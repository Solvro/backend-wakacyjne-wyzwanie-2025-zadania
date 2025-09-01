import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTripDto {
  @IsString()
  name: string;

  @IsString()
  destination: string;

  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string | null;

  @IsOptional()
  @IsNumber()
  budget?: number | null;
}
