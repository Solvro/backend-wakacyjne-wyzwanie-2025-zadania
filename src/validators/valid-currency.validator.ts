import { Currencies } from "@prisma/client";
import { ValidatorConstraint } from "class-validator";
import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "currency" })
export class Currency implements ValidatorConstraintInterface {
  validate(currency: string, _: ValidationArguments) {
    if (!(currency in Currencies)) {
      return false;
    }
    return true;
  }
  defaultMessage(_: ValidationArguments) {
    return "Currency is not currently supported";
  }
}
