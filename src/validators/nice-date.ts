import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Trip } from "generated/prisma";

@ValidatorConstraint({ name: "IsStartBeforeEnd", async: false })
export class IsStartBeforeEnd implements ValidatorConstraintInterface {
  validate(object: Trip, _: ValidationArguments) {
    return object.startDate < object.endDate;
  }

  defaultMessage(_: ValidationArguments) {
    return "startDate must be before endDate";
  }
}
