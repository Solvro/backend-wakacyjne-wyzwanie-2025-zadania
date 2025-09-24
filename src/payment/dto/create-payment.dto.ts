import { IsEnum, IsNumber } from "class-validator";
import { Currency } from "src/currency/currency.enum";

// twój enum w kodzie TS

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsEnum(Currency)
  currency: Currency;
}
