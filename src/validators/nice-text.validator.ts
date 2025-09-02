import { ValidatorConstraint } from "class-validator";
import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "niceText", async: false })
export class NiceText implements ValidatorConstraintInterface {
  validate(text: string, _: ValidationArguments) {
    return !text.includes("piwo");
  }

  defaultMessage(_: ValidationArguments) {
    return "Takie rzeczy to chyba po pracy, racja?";
  }
}
