import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";
import { ValidatorConstraint } from "class-validator";

export const ISO_CODES = new Set(["USD", "EUR", "GBP", "PLN", "JPY", "CHF"]);

@ValidatorConstraint({ name: "isValidCurrencyCode", async: false })
export class IsValidCurrencyCodeValidator
  implements ValidatorConstraintInterface
{
  validate(
    currency: string,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> | boolean {
    return ISO_CODES.has(currency.toUpperCase());
  }

  defaultMessage(_arguments: ValidationArguments): string {
    return "Currency code must be a valid ISO 4217 code";
  }
}
