import { ValidatorConstraint, registerDecorator } from "class-validator";

@ValidatorConstraint({ name: "isFutureDate", async: false })
export class IsFutureDateConstraint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: unknown, _validationArguments: any) {
    if (typeof value !== "string") {
      return false;
    }

    const inputDate = new Date(value);
    const today = new Date();

    // Set today to start of day for comparison
    today.setHours(0, 0, 0, 0);

    // Check if the date is valid and in the future or today
    return !Number.isNaN(inputDate.getTime()) && inputDate >= today;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultMessage(_validationArguments: any) {
    return "Date must be today or in the future";
  }
}

export function IsFutureDate(validationOptions?: Record<string, unknown>) {
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
