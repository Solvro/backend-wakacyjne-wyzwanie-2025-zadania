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

    if (Number.isNaN(inputDate.getTime())) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate >= today;
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
