import { IsEnum, IsInt, IsOptional, IsString, Matches } from "class-validator";

export const CURRENCIES = [
  "PLN",
  "EUR",
  "USD",
  "AUD",
  "CAD",
  "GBP",
  "CHF",
] as const;
type SupportedCurrency = (typeof CURRENCIES)[number];

export class CreatePaymentDto {
  @IsInt()
  tripId: number;

  @IsOptional()
  @IsInt()
  participantId?: number;

  @IsEnum(CURRENCIES)
  currency: SupportedCurrency;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  amount: string;
}
