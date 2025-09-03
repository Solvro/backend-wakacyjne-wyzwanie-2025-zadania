import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";
import { ValidatorConstraint } from "class-validator";

@ValidatorConstraint({ name: "NoSpaces", async: false })
export class NoSpaces implements ValidatorConstraintInterface {
  validate(text: string, _: ValidationArguments) {
    return !/\s/.test(text);
  }
  defaultMessage?(_: ValidationArguments): string {
    return "Text shouldn't contain spaces";
  }
}
