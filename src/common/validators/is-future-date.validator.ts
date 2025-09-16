import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

@ValidatorConstraint({ name: "isFutureDate", async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, _arguments: ValidationArguments): boolean {
    if (!value) {
      return false;
    }

    const inputDate = new Date(value as string);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
