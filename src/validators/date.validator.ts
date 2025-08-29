import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "dateValidator", async: false })
export class DateValidator implements ValidatorConstraintInterface {
  validate(date: string, _: ValidationArguments) {
    const todayDate = new Date().toISOString();
    const inputDate = new Date(date).toISOString();
    return inputDate <= todayDate;
  }

  defaultMessage(_: ValidationArguments): string {
    return "Date cannot be in the future";
  }
}
