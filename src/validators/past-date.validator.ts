import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";
import { ValidatorConstraint } from "class-validator";

@ValidatorConstraint({ name: "IsPastDate", async: false })
export class IsPastDate implements ValidatorConstraintInterface {
  validate(value: unknown, _: ValidationArguments) {
    if (value === undefined || value === null) {
      return false;
    }
    const date = new Date(value as string);
    if (Number.isNaN(date.getTime())) {
      return false;
    }
    return date.getTime() < Date.now();
  }
  defaultMessage(_: ValidationArguments): string {
    return "Date must be in the past";
  }
}
