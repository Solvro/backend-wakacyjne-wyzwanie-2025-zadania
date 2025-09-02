import { ValidatorConstraint } from "class-validator";
import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "password", async: false })
export class Password implements ValidatorConstraintInterface {
  validate(password: string, _: ValidationArguments) {
    if (password.length < 6) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    return true;
  }
  defaultMessage(_: ValidationArguments) {
    return "Password has to be between 6-30 characters long and contain at least one uppercase letter, one special character and one digit.";
  }
}
