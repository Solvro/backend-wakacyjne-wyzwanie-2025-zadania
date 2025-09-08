import { registerDecorator } from "class-validator";

export function IsNotPastDate(
  validationOptions?: import("class-validator").ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isNotPastDate",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(
          value: unknown,
          _arguments: import("class-validator").ValidationArguments,
        ): boolean {
          if (value === null || value === undefined || value === "") {
            return true;
          }

          if (
            typeof value !== "string" &&
            typeof value !== "number" &&
            !(value instanceof Date)
          ) {
            return false;
          }

          const date = new Date(value);
          if (Number.isNaN(date.getTime())) {
            return false;
          }

          const now = new Date();
          now.setHours(0, 0, 0, 0);

          return date >= now;
        },
        defaultMessage(
          arguments_: import("class-validator").ValidationArguments,
        ) {
          return `${arguments_.property} cannot be in the past`;
        },
      },
    });
  };
}
