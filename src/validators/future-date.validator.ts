import { ValidatorConstraint, registerDecorator } from "class-validator";
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: unknown, _arguments: ValidationArguments): boolean {
    if (typeof date !== "string" && !(date instanceof Date)) {
      return false;
    }

    const inputDate = new Date(date);

    if (isNaN(Date.parse(date as string))) {
      return false;
    }

    const inputDay = new Date(date).toISOString().split("T")[0];
    const todayDay = new Date().toISOString().split("T")[0];

    return inputDay >= todayDay;
    
  }

  defaultMessage(_arguments: ValidationArguments): string {
    return "Date must be today or in the future";
  }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
}
