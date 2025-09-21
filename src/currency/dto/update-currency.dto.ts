import { IsNumber, IsOptional } from "class-validator";

export class UpdateCurrencyRateDto {
  @IsOptional()
  @IsNumber()
  rate?: number;
}
