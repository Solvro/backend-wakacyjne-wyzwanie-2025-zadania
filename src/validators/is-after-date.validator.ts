/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ValidatorConstraint, registerDecorator } from "class-validator";

@ValidatorConstraint({ name: "isAfterDate", async: false })
export class IsAfterDateConstraint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: unknown, validationArguments: any) {
    if (typeof value !== "string") {
      return false;
    }

    const [relatedPropertyName] = validationArguments.constraints as string[];
    const relatedValue = (
      validationArguments.object as Record<string, unknown>
    )[relatedPropertyName];

    if (typeof relatedValue !== "string") {
      return false;
    }

    const currentDate = new Date(value);
    const relatedDate = new Date(relatedValue);

    // Check if both dates are valid and current date is after the related date
    return (
      !Number.isNaN(currentDate.getTime()) &&
      !Number.isNaN(relatedDate.getTime()) &&
      currentDate > relatedDate
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultMessage(validationArguments: any) {
    const [relatedPropertyName] = validationArguments.constraints as string[];
    return `${validationArguments.property as string} must be after ${relatedPropertyName}`;
  }
}

export function IsAfterDate(
  property: string,
  validationOptions?: Record<string, unknown>,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAfterDateConstraint,
    });
  };
}
