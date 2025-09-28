import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "niceAge", async: false })
export class NiceAge implements ValidatorConstraintInterface {
  validate(age: number, _: ValidationArguments) {
    if (age > 140 || age < 0) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(_: ValidationArguments) {
    return "Person can not be that old";
  }
}
