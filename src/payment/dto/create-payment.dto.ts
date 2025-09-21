import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

export class CreatePaymentDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsString()
  @Length(3, 3)
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;
}
