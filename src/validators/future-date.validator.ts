import { ValidatorConstraint, registerDecorator } from "class-validator";
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: unknown, _arguments: ValidationArguments): boolean {
    if (typeof date !== "string") {
      return false;
    }
    const then = new Date(date);

    if (Number.isNaN(then.valueOf())) {
      return false;
    }
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    then.setHours(0, 0, 0, 0);

    return then.valueOf() >= now.valueOf();
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
