import type { ValidationArguments, ValidationOptions } from "class-validator";
import { registerDecorator } from "class-validator";

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isFutureDate",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(
          value: string | Date | null | undefined,
          _arguments: ValidationArguments,
        ): boolean {
          if (value == null) {
            return true;
          } // pole opcjonalne
          const date = value instanceof Date ? value : new Date(value);
          return date.getTime() > Date.now();
        },
        defaultMessage(arguments_: ValidationArguments) {
          return `${arguments_.property} must be a future date`;
        },
      },
    });
  };
}
