import type { ValidationArguments, ValidationOptions } from "class-validator";
import { registerDecorator } from "class-validator";

interface IsAfterOptions {
  allowEqual?: boolean;
  message?: string;
}

export function IsAfter(
  otherProperty: string,
  options?: IsAfterOptions & ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "IsAfter",
      target: object.constructor,
      propertyName,
      constraints: [otherProperty, options],
      options,
      validator: {
        validate(value: unknown, arguments_: ValidationArguments): boolean {
          if (value === undefined || value === null) {
            return true;
          }

          if (typeof value !== "string") {
            return false;
          }
          const [other, localOptions] = arguments_.constraints as [
            string,
            IsAfterOptions | undefined,
          ];
          const otherValue = (arguments_.object as Record<string, unknown>)[
            other
          ];

          if (typeof otherValue !== "string") {
            return true;
          }

          const a = Date.parse(otherValue);
          const b = Date.parse(value);
          if (!Number.isFinite(a) || !Number.isFinite(b)) {
            return false;
          }
          return (localOptions?.allowEqual ?? false) ? b >= a : b > a;
        },
        defaultMessage(arguments_: ValidationArguments): string {
          const [other, localOptions] = arguments_.constraints as [
            string,
            IsAfterOptions | undefined,
          ];
          return (
            localOptions?.message ??
            `${arguments_.property} must be ${(localOptions?.allowEqual ?? false) ? "on or after" : "after"} ${other}`
          );
        },
      },
    });
  };
}
