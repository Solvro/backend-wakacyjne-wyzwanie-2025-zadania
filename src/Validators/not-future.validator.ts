import { ValidatorConstraint } from "class-validator";
import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "NotFuture", async: false })
export class NotFuture implements ValidatorConstraintInterface {
  validate(date: Date, _: ValidationArguments) {
    return date <= new Date();
  }

  defaultMessage(_: ValidationArguments) {
    return "Date must not be in the future";
  }
}
