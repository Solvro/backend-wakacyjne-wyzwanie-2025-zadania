import { CurrencyName } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsEnum(CurrencyName)
  currency: CurrencyName;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @Type(() => Date)
  timeStamp: Date;
}
