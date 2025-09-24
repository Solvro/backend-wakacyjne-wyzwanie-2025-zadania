import { IsEnum, IsNumber } from "class-validator";

import { Currency } from "../currency.enum";

export class CreateCurrencyRateDto {
  @IsEnum(Currency)
  code: Currency;

  @IsNumber()
  rate: number;
}
