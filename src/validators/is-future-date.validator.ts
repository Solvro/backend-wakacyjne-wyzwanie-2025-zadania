import type { ValidationArguments, ValidationOptions } from "class-validator";
import { registerDecorator } from "class-validator";

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "isFutureDate",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(
          value: unknown,
          _arguments_validation: ValidationArguments,
        ): boolean {
          if (value === null) {
            return true;
          }
          const d = new Date(value as string | Date);
          return !Number.isNaN(d.getTime()) && d.getTime() > Date.now();
        },
      },
    });
  };
}
